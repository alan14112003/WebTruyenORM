import { Op } from 'sequelize'
import RedisConfig from '@/config/Redis.config'
import Story from '@/app/models/Story.model'
import StoryAccessEnum from '@/app/enums/story/StoryAccess.enum'
import ChapterUtil from '@/app/utils/Chapter.util'
import Chapter from '@/app/models/Chapter.model'
import ChapterAccessEnum from '@/app/enums/chapter/ChapterAccess.enum'
import PurchaseUtil from '@/app/utils/Purchase.util'
import HistoryUtil from '@/app/utils/History.util'
import ViewStoryUtil from '@/app/utils/ViewStory.util'
import ChapterKeyEnum from '@/app/enums/redis_key/ChapterKey.enum'
import StatusCodeEnum from '@/app/enums/response_code/notification/StatusCode.enum'
import ChapterCodeEnum from '@/app/enums/response_code/story/ChapterCode.enum'
import AuthCodeEnum from '@/app/enums/response_code/auth/AuthCode.enum'
import StoryCodeEnum from '@/app/enums/response_code/story/StoryCode.enum'
import ViewStory from '@/app/models/ViewStory.model'
import { formatRedisKey, splitArrayIntoChunks } from '@/app/utils/helper.util'
import StoryTypeEnum from '@/app/enums/story/StoryType.enum'
import UploadUtil from '@/app/utils/Upload.util'

const ChapterController = {
  allByStoryId: async (req, res, next) => {
    try {
      const auth = req.user
      const { slugId } = req.params
      const { order } = req.query

      const [storySlug, storyId] = slugId.split('.-.')

      let chapters

      if (!chapters) {
        chapters = await ChapterUtil.getAllByStory(storyId, storySlug, order, {
          moreWhere: {
            access: ChapterAccessEnum.PUBLIC,
          },
          moreIncludes: [
            // include views để cho người dùng biết là đã đọc chương nào
            {
              model: ViewStory,
              as: 'views',
              required: false,
              where: {
                UserId: auth.id,
              },
            },
          ],
        })

        // chuyển đổi mảng views thành seen với giá trị boolean
        chapters = JSON.parse(JSON.stringify(chapters))
        chapters.forEach((chapter) => {
          chapter.seen = false
          if (chapter.views.length > 0) {
            chapter.seen = true
          }
          delete chapter.views

          return chapter
        })
      }

      return res.status(200).json(chapters)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  allByStoryIdAuth: async (req, res, next) => {
    try {
      const { slugId } = req.params
      const { order } = req.query
      const auth = req.user

      const [storySlug, storyId] = slugId.split('.-.')

      const redisKey = formatRedisKey(`${ChapterKeyEnum.ALL_BY_AUTH}.
          ${storyId}.
          ${order}
        `)

      let chapters = await RedisConfig.get(redisKey)

      if (!chapters) {
        chapters = await ChapterUtil.getAllByStory(storyId, storySlug, order, {
          moreWhere: {
            '$Story.UserId$': auth.id,
          },
        })
      }

      RedisConfig.set(redisKey, chapters)

      return res.status(200).json(chapters)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.params
      const auth = req.user

      let chapter

      if (!chapter) {
        chapter = await ChapterUtil.getOneChapter(id, {
          moreWhere: {
            access: StoryAccessEnum.PUBLIC,
          },
        })
      }

      if (!chapter) {
        return res.status(404).json({
          code: StatusCodeEnum.notFound,
          message: 'not found',
        })
      }

      if (auth.id === chapter.Story.UserId) {
        return res.status(200).json(chapter)
      }

      // thêm vào lịch sử đọc truyện và thêm view nếu chưa có
      await Promise.all([
        ViewStoryUtil.setViewStory(auth.id, chapter.StoryId, chapter.id),
        HistoryUtil.setHistoryStory(auth.id, chapter.StoryId, chapter.id),
      ])

      // kiểm tra nếu chương không miễn phí
      if (chapter.isFree) {
        return res.status(200).json(chapter)
      }

      // nếu chương không miễn phí thì phải kiểm tra người dùng đó có mua chương chưa.
      const transaction = await PurchaseUtil.getTransaction(auth.id, chapter.id)

      if (!transaction) {
        return res.status(403).json({
          code: ChapterCodeEnum.needPurchase,
          message: 'you need to purchase this chapter before watching',
          price: chapter.price,
        })
      }

      return res.status(200).json(chapter)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  getByAuth: async (req, res, next) => {
    try {
      const { id } = req.params
      const auth = req.user

      const redisKey = `${ChapterKeyEnum.GET_BY_AUTH}.${id}`
      let chapter = await RedisConfig.get(redisKey)

      if (!chapter) {
        chapter = await ChapterUtil.getOneChapter(id, {
          moreWhere: {
            '$Story.UserId$': auth.id,
          },
        })
      }

      if (!chapter) {
        return res.status(404).json({
          code: StatusCodeEnum.notFound,
          message: 'not found',
        })
      }

      RedisConfig.set(redisKey, chapter)

      return res.status(200).json(chapter)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  insert: async (req, res, next) => {
    try {
      const auth = req.user
      const chapterDTO = req.body

      chapterDTO.access = StoryAccessEnum.PRIVATE

      const story = await Story.findByPk(chapterDTO.StoryId)
      if (!story) {
        return res.status(400).json({
          code: StoryCodeEnum.notFound,
          message: 'story not found',
        })
      }

      if (story.UserId != auth.id) {
        return res.status(403).json({
          code: AuthCodeEnum.accessDenined,
          message: 'access denined',
        })
      }

      const chapter = await Chapter.create(chapterDTO)

      RedisConfig.delWithPrefix(`${ChapterKeyEnum.ALL}.${chapterDTO.StoryId}.`)
      RedisConfig.delWithPrefix(
        `${ChapterKeyEnum.ALL_BY_AUTH}.${chapterDTO.StoryId}.`
      )

      return res.status(201).json(chapter)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const auth = req.user
      const { id } = req.params
      const chapterDTO = req.body

      const chapter = await Chapter.findByPk(id, {
        include: [
          {
            model: Story,
            required: true,
          },
        ],
      })

      if (!chapter) {
        return res.status(404).json({
          code: StatusCodeEnum.notFound,
          message: 'not found',
        })
      }

      if (chapter.Story.UserId != auth.id) {
        return res.status(403).json({
          code: AuthCodeEnum.accessDenined,
          message: 'access denined',
        })
      }

      const [updatedCount] = await Chapter.update(chapterDTO, {
        where: {
          id: id,
        },
      })

      if (updatedCount) {
        RedisConfig.delWithPrefix(`${ChapterKeyEnum.ALL}.${chapter.StoryId}.`)
        RedisConfig.delWithPrefix(
          `${ChapterKeyEnum.ALL_BY_AUTH}.${chapter.StoryId}.`
        )

        RedisConfig.del(`${ChapterKeyEnum.GET}.${id}`)
        RedisConfig.del(`${ChapterKeyEnum.GET_BY_AUTH}.${id}`)
      }

      return res.status(200).json(updatedCount)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const auth = req.user
      const { id } = req.params

      const chapter = await Chapter.findByPk(id, {
        include: [
          {
            model: Story,
            required: true,
          },
        ],
      })

      if (!chapter) {
        return res.status(404).json({
          code: StatusCodeEnum.notFound,
          message: 'not found',
        })
      }

      if (chapter.Story.UserId != auth.id) {
        return res.status(403).json({
          code: AuthCodeEnum.accessDenined,
          message: 'access denined',
        })
      }

      if (chapter.access != ChapterAccessEnum.PRIVATE) {
        return res.status(400).json({
          code: ChapterCodeEnum.notPrivate,
          message: 'chapter is not private',
        })
      }

      // xóa ảnh trên server nếu là truyện tranh
      if (chapter.type === StoryTypeEnum.COMIC) {
        const publicIds = JSON.parse(chapter.content).map(
          (item) => item.public_id
        )

        Promise.all(
          splitArrayIntoChunks(publicIds, 100).map(
            (ChapterImageUploadedChunk) => {
              return UploadUtil.deleteMultipleFile(ChapterImageUploadedChunk)
            }
          )
        ).then(() => {
          console.log('-------------------------------')
          console.log('------delete images from server success------')
          console.log('-------------------------------')
        })
      }

      const deletedCount = await Chapter.destroy({
        where: {
          id: id,
        },
      })

      if (deletedCount) {
        RedisConfig.delWithPrefix(`${ChapterKeyEnum.ALL}.${chapter.StoryId}.`)
        RedisConfig.delWithPrefix(
          `${ChapterKeyEnum.ALL_BY_AUTH}.${chapter.StoryId}.`
        )

        RedisConfig.del(`${ChapterKeyEnum.GET}.${id}`)
        RedisConfig.del(`${ChapterKeyEnum.GET_BY_AUTH}.${id}`)
      }

      return res.status(200).json(deletedCount)
    } catch (error) {
      next(error)
    }
  },

  public: async (req, res, next) => {
    try {
      const auth = req.user
      const { ids } = req.body

      const chapters = await Chapter.findAll({
        include: [
          {
            model: Story,
            required: true,
          },
        ],
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      })

      if (!chapters) {
        return res.status(400).json({
          code: StatusCodeEnum.notFound,
          message: 'not found',
        })
      }

      for (const chapter of chapters) {
        if (chapter.Story.UserId !== auth.id) {
          return res.status(403).json({
            code: AuthCodeEnum.accessDenined,
            message: 'access denined',
          })
        }

        if (chapter.access != ChapterAccessEnum.PRIVATE) {
          return res.status(400).json({
            code: ChapterCodeEnum.notPrivate,
            message: `chapter id: ${chapter.id} is not private`,
          })
        }
      }

      const [updatedCount] = await Chapter.update(
        {
          access: ChapterAccessEnum.PUBLIC,
        },
        {
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        }
      )

      if (updatedCount) {
        for (const chapter of chapters) {
          await RedisConfig.delWithPrefix(
            `${ChapterKeyEnum.ALL}.${chapter.StoryId}.`
          )
          await RedisConfig.delWithPrefix(
            `${ChapterKeyEnum.ALL_BY_AUTH}.${chapter.StoryId}.`
          )

          RedisConfig.del(`${ChapterKeyEnum.GET}.${chapter.id}`)
          RedisConfig.del(`${ChapterKeyEnum.GET_BY_AUTH}.${chapter.id}`)
        }
      }

      return res.status(200).json(updatedCount)
    } catch (error) {
      next(error)
    }
  },
}

export default ChapterController
