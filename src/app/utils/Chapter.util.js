import { Op } from 'sequelize'
import Story from '../models/Story.model'
import User from '../models/User.model'
import Chapter from '../models/Chapter.model'
import ChapterAccessEnum from '../enums/chapter/ChapterAccess.enum'
import RedisConfig from '@/config/Redis.config'
import ChapterKeyEnum from '../enums/redis_key/ChapterKey.enum'

const ChapterUtil = {
  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindOptions
   * moreIncludes: import("sequelize").FindOptions<any>["include"]
   * }  } options
   */
  getAllByStory: async (storyId, storySlug, order, options) => {
    order = order == 'asc' ? order : 'desc'

    // kiểm tra nếu không có options.moreIncludes thì cho nó là mảng rỗng
    options.moreIncludes = options.moreIncludes ?? []

    return Chapter.findAll({
      where: {
        ...options.moreWhere,
      },
      include: [
        {
          model: Story,
          required: true,
          attributes: [],
          include: {
            model: User,
            required: true,
            attributes: [],
          },
          where: {
            id: storyId,
            slug: storySlug,
          },
        },
        ...options.moreIncludes,
      ],
      attributes: {
        exclude: ['content', 'createdAt', 'updatedAt', 'deletedAt'],
      },
      order: [['number', order]],
      ...options.moreOptions,
    })
  },

  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindAndCountOptions
   * }  } options
   */
  getOneChapter: async (chapterId, options) => {
    return Chapter.findOne({
      where: {
        id: chapterId,
        ...options.moreWhere,
      },
      include: [
        {
          model: Story,
          required: true,
          attributes: [],
          include: {
            model: User,
            required: true,
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ['deletedAt'],
      },
      ...options.moreOptions,
    })
  },

  checkChapterPublicExist: async (storyId) => {
    const chapterPublic = await Chapter.findOne({
      where: {
        StoryId: storyId,
        access: ChapterAccessEnum.PUBLIC,
      },
    })

    return !!chapterPublic
  },

  publicChapterTask: async () => {
    const currentTime = new Date()
    const chapters = await Chapter.findAll({
      where: {
        isFree: false,
        privateEnd: {
          [Op.lte]: currentTime,
        },
        access: ChapterAccessEnum.PUBLIC,
      },
    })

    if (!chapters) {
      return
    }

    const chapterIds = chapters.map((chapter) => chapter.id)

    const [updatedCount] = await Chapter.update(
      {
        isFree: true,
      },
      {
        where: {
          id: {
            [Op.in]: chapterIds,
          },
        },
      }
    )

    if (updatedCount) {
      for (const chapter of chapters) {
        RedisConfig.delWithPrefix(`${ChapterKeyEnum.ALL}.
          ${chapter.StoryId}.
          `)

        RedisConfig.del(`${ChapterKeyEnum.GET}.${chapter.id}.`)
      }
    }
    return chapterIds
  },
}

export default ChapterUtil
