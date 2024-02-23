import Story from '../models/Story.model'
import User from '../models/User.model'
import Chapter from '../models/Chapter.model'
import ChapterAccessEnum from '../enums/chapter/ChapterAccess.enum'

const ChapterUtil = {
  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindAndCountOptions
   * }  } options
   */
  getAllByStory: async (storyId, storySlug, order, options) => {
    order = order == 'asc' ? order : 'desc'

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

    return chapterPublic ? true : false
  },
}

export default ChapterUtil
