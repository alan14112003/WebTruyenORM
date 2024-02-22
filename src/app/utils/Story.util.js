import { Sequelize, Op } from 'sequelize'
import CategoryStory from '../models/CategoryStory.model'
import PaginationUtil from './Pagination.util'
import Story from '../models/Story.model'
import Category from '../models/Category.model'
import Author from '../models/Author.model'
import User from '../models/User.model'
import UserUtil from './User.util'
import ChapterAccessEnum from '../enums/chapter/ChapterAccess.enum'

const StoryUtil = {
  /**
   * @param { import("sequelize").Transaction } trx
   * @param {number[]} categories
   */
  updateCategories: async (categories, storyId, trx) => {
    const oldCategories = await CategoryStory.findAll({
      where: {
        StoryId: storyId,
      },
      attributes: ['CategoryId'],
      raw: true,
    })

    const oldCategoriesArr = oldCategories.map(
      (category) => category.CategoryId
    )

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
  },

  includeCountsAttr: () => {
    return [
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
    ]
  },

  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindAndCountOptions
   * }  } options
   */
  getAllStories: async (
    {
      page,
      perPage,
      type,
      isFull,
      categoryIn,
      categoryNotIn,
      authorId,
      userId,
    },
    options
  ) => {
    const categoryWhere = {}
    const storyWhere = {}

    // where của category
    if (categoryIn) {
      const categoryInArr = categoryIn.split(',')
      categoryWhere['id'] = {
        [Op.in]: Sequelize.literal(`(select c.StoryId
          from categorystories c 
          where c.CategoryId in (${categoryIn})
          group by c.StoryId 
          having (count(c.CategoryId) = ${categoryInArr.length}))`),
      }
    }

    if (categoryNotIn) {
      categoryWhere['id'] = {
        ...categoryWhere['id'],
        [Op.notIn]: Sequelize.literal(`(select distinct(c.StoryId)
          from categorystories c 
          where c.CategoryId in (${categoryNotIn}))`),
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

    return await PaginationUtil.paginate(Story, page, perPage, {
      where: {
        ...storyWhere,
        ...categoryWhere,
        ...options.moreWhere,
      },
      subQuery: false,

      attributes: {
        include: [
          ...StoryUtil.includeCountsAttr(),
          [
            Sequelize.literal(
              `(SELECT Chapter.number 
              from chapters Chapter 
              where Chapter.StoryId = Story.id 
              and Chapter.deletedAt not null
              and Chapter.access = ${ChapterAccessEnum.PUBLIC}
              )`
            ),
            'lastChapter',
          ],
        ],
      },
      include: [
        {
          model: Category,
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          required: true,
          attributes: [...UserUtil.getPublicInfoAttribute()],
        },
      ],
      order: [['updatedAt', 'DESC']],
      ...options.moreOptions,
    })
  },

  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindAndCountOptions
   * }  } options
   */
  getOneStory: async (id, slug, options) => {
    return await Story.findOne({
      attributes: {
        include: [...StoryUtil.includeCountsAttr()],
      },
      where: { id: id, slug: slug, ...options.moreWhere },
      include: [
        {
          model: Author,
        },
        {
          model: Category,
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          required: true,
          attributes: [...UserUtil.getInfoInstoriesAttribute()],
        },
      ],
      ...options.moreOptions,
    })
  },
}

export default StoryUtil
