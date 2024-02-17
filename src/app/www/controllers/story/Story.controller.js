import { Op, Sequelize } from 'sequelize'
import RedisConfig from '@/config/Redis.config'
import slugifyConfig from '@/config/Slugify.config'
import Story from '@/app/models/Story.model'
import PaginationUtil from '@/app/utils/Pagination.util'
import Category from '@/app/models/Category.model'
import StoryAccessEnum from '@/app/enums/story/StoryAccess.enum'
import CategoryStory from '@/app/models/CategoryStory.model'
import SequelizeConfig from '@/config/Sequelize.config'

const RedisKeyName = 'stories:'
const REDIS_KEY = {
  all: RedisKeyName + 'all',
  get: RedisKeyName + 'get',
}

const updateCategories = async (categories, storyId, trx) => {
  const oldCategories = await CategoryStory.findAll({
    where: {
      StoryId: storyId,
    },
    attributes: ['CategoryId'],
    raw: true,
  })

  const oldCategoriesArr = oldCategories.map((category) => category.CategoryId)

  const catIns = categories.filter(
    (element) => !oldCategoriesArr.includes(element)
  )

  const catDel = oldCategoriesArr.filter(
    (element) => !categories.includes(element)
  )

  const promises = []
  if (catIns.length > 0) {
    promises.push(
      CategoryStory.bulkCreate(
        catIns.map((catId) => ({ StoryId: storyId, CategoryId: catId })),
        { transaction: trx }
      )
    )
  }

  if (catDel.length > 0) {
    promises.push(
      CategoryStory.destroy({
        where: { CategoryId: { [Op.in]: catDel } },
        transaction: trx,
      })
    )
  }

  await Promise.all(promises)
}

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
      } = req.query

      const redisKey = `${REDIS_KEY.all}.
        ${perPage}.
        ${page}.
        ${type}.
        ${isFull}.
        ${categoryIn}.
        ${categoryNotIn}
        `
      let stories = await RedisConfig.get(redisKey)

      if (!stories) {
        const categoryWhere = {}
        const storyWhere = {}

        // where của category
        if (categoryIn) {
          const categoryInArr = categoryIn.split(',')
          categoryWhere.id = {
            [Op.in]: categoryInArr,
          }
        }

        if (categoryNotIn) {
          const categoryNotInArr = categoryNotIn.split(',')
          categoryWhere.id = {
            ...categoryWhere.id,
            [Op.notIn]: categoryNotInArr,
          }
        }

        // where của story
        if (isFull) {
          storyWhere.isFull = isFull
        }

        if (type) {
          storyWhere.type = type
        }

        if (authorId) {
          storyWhere.authorId = authorId
        }

        if (userId) {
          storyWhere.userId = userId
        }

        stories = await PaginationUtil.paginate(Story, page, perPage, {
          attributes: {
            include: [
              [
                Sequelize.literal(
                  `(SELECT count(*) from viewstories ViewStory where ViewStory.StoryId = Story.id)`
                ),
                'viewCount',
              ],
              [
                Sequelize.literal(
                  `(SELECT count(*) from likestories LikeStory where LikeStory.StoryId = Story.id)`
                ),
                'likeCount',
              ],
              [
                Sequelize.literal(
                  `(SELECT count(*) from followstories FollowStory where FollowStory.StoryId = Story.id)`
                ),
                'followCount',
              ],
            ],
          },
          include: [
            {
              model: Category,
              where: {
                ...categoryWhere,
              },
            },
          ],
          where: {
            ...storyWhere,
            access: StoryAccessEnum.PUBLIC,
          },
        })
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
      const { id } = req.params

      const redisKey = `${REDIS_KEY.get}.${id}`
      let category = await RedisConfig.get(redisKey)

      if (!category) {
        category = await Category.findOne({
          where: { id: id },
        })
      }

      RedisConfig.set(redisKey, category)

      return res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  },

  insert: async (req, res, next) => {
    const trx = await SequelizeConfig.transaction()

    try {
      const storyDTO = req.body

      storyDTO.slug = slugifyConfig(storyDTO.name)
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

      RedisConfig.delWithPrefix(REDIS_KEY.all)

      trx.commit()
      return res.status(201).json(story)
    } catch (error) {
      trx.rollback()
      next(error)
    }
  },

  update: async (req, res, next) => {
    const trx = await SequelizeConfig.transaction()

    try {
      const { id } = req.params
      const body = req.body

      const story = await Story.findByPk(id)

      if (!story) {
        return res.status(404).json('story not found')
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
        await updateCategories(body.categories, id, trx)
      }

      if (updatedCount) {
        RedisConfig.delWithPrefix(REDIS_KEY.all)
        RedisConfig.del(`${REDIS_KEY.get}.${id}`)
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
      const id = req.params.id
      const deletedCount = await Category.destroy({
        where: {
          id: id,
        },
      })
      if (deletedCount) {
        RedisConfig.del(REDIS_KEY.all)
        RedisConfig.del(`${REDIS_KEY.get}.${id}`)
      }
      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default StoryController
