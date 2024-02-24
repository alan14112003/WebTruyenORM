import { Op } from 'sequelize'
import RedisConfig from '@/config/Redis.config'
import slugifyConfig from '@/config/Slugify.config'
import Story from '@/app/models/Story.model'
import StoryAccessEnum from '@/app/enums/story/StoryAccess.enum'
import CategoryStory from '@/app/models/CategoryStory.model'
import SequelizeConfig from '@/config/Sequelize.config'
import StoryUtil from '@/app/utils/Story.util'
import ChapterUtil from '@/app/utils/Chapter.util'
import StoryKeyEnum from '@/app/enums/redis_key/StoryKey.enum'

const StoryController = {
  all: async (req, res, next) => {
    try {
      const {
        page,
        perPage,
        type,
        isFull,
        categoryIn,
        categoryNotIn,
        authorId,
        userId,
        order,
      } = req.query

      const redisKey = `${StoryKeyEnum.ALL}.
        ${perPage}.
        ${page}.
        ${type}.
        ${isFull}.
        ${categoryIn}.
        ${categoryNotIn}.
        ${authorId}.
        ${userId}.
        ${order}.
        `
      let stories = await RedisConfig.get(redisKey)

      if (!stories) {
        stories = await StoryUtil.getAllStories(
          {
            page,
            perPage,
            type,
            isFull,
            categoryIn,
            categoryNotIn,
            authorId,
            userId,
            order,
          },
          {
            moreWhere: {
              access: StoryAccessEnum.PUBLIC,
            },
          }
        )
      }

      RedisConfig.set(redisKey, stories)

      return res.status(200).json(stories)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { slugId } = req.params
      const [slug, id] = slugId.split('.-.')

      const redisKey = `${StoryKeyEnum.GET}.${id}`
      let story = await RedisConfig.get(redisKey)

      if (!story) {
        story = await StoryUtil.getOneStory(id, slug, {
          moreWhere: {
            access: StoryAccessEnum.PUBLIC,
          },
        })
      }

      if (!story) {
        return res.status(404).json('story not found')
      }

      RedisConfig.set(redisKey, story)

      return res.status(200).json(story)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  insert: async (req, res, next) => {
    const trx = await SequelizeConfig.transaction()

    try {
      const auth = req.user
      const storyDTO = req.body

      storyDTO.slug = slugifyConfig(storyDTO.name)
      storyDTO.UserId = auth.id
      storyDTO.isFull = false
      storyDTO.access = StoryAccessEnum.PRIVATE

      const story = await Story.create(storyDTO, {
        transaction: trx,
      })

      await CategoryStory.bulkCreate(
        storyDTO.categories.map((categoryId) => ({
          CategoryId: categoryId,
          StoryId: story.id,
        })),
        {
          transaction: trx,
        }
      )

      RedisConfig.delWithPrefix(StoryKeyEnum.ALL)

      trx.commit()
      return res.status(201).json(story)
    } catch (error) {
      console.log(error)
      trx.rollback()
      next(error)
    }
  },

  update: async (req, res, next) => {
    const trx = await SequelizeConfig.transaction()

    try {
      const auth = req.user
      const { id } = req.params
      const body = req.body

      const story = await Story.findByPk(id)

      if (!story) {
        return res.status(404).json('story not found')
      }

      if (story.UserId != auth.id) {
        return res.status(403).json('access denined')
      }

      if (body.name) {
        body.slug = slugifyConfig(body.name)
      }

      const [updatedCount] = await Story.update(body, {
        where: {
          id: id,
        },
        transaction: trx,
      })

      if (body.categories) {
        await StoryUtil.updateCategories(body.categories, id, trx)
      }

      if (updatedCount) {
        RedisConfig.delWithPrefix(StoryKeyEnum.ALL)
        RedisConfig.del(`${StoryKeyEnum.GET}.${id}`)
      }

      await trx.commit()
      return res.status(200).json('success')
    } catch (error) {
      await trx.rollback()
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const auth = req.user
      const { id } = req.params

      const deletedCount = await Story.destroy({
        where: {
          id: id,
          UserId: auth.id,
        },
      })

      if (deletedCount) {
        RedisConfig.delWithPrefix(StoryKeyEnum.ALL)
        RedisConfig.del(`${StoryKeyEnum.GET}.${id}`)
      }

      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },

  hardDelete: async (req, res, next) => {
    try {
      const auth = req.user
      const { id } = req.params

      const deletedCount = await Story.destroy({
        where: {
          id: id,
          UserId: auth.id,
          deletedAt: {
            [Op.not]: null,
          },
        },
        force: true,
      })

      if (deletedCount) {
        RedisConfig.delWithPrefix(StoryKeyEnum.ALL)
        RedisConfig.del(`${StoryKeyEnum.GET}.${id}`)
      }

      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },

  public: async (req, res, next) => {
    try {
      const auth = req.user
      const { id } = req.params

      const story = await Story.findOne({
        where: {
          id: id,
        },
      })

      if (!story) {
        return res.status(404).json('story not found')
      }

      if (story.UserId !== auth.id) {
        return res.status(403).json(`access denined`)
      }

      if (story.access != StoryAccessEnum.PRIVATE) {
        return res.status(400).json(`story is not private`)
      }

      const chapterPublicExist = await ChapterUtil.checkChapterPublicExist(id)

      if (!chapterPublicExist) {
        return res.status(400).json(`must have at least 1 published chapter`)
      }

      const [updatedCount] = await Story.update(
        {
          access: StoryAccessEnum.PUBLIC,
        },
        {
          where: {
            id: id,
          },
        }
      )

      if (updatedCount) {
        RedisConfig.delWithPrefix(StoryKeyEnum.ALL)
        RedisConfig.del(`${StoryKeyEnum.GET}.${id}`)
      }

      return res.status(200).json(updatedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default StoryController
