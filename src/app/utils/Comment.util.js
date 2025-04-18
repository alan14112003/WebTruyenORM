import { Op } from 'sequelize'
import Comment from '../models/Comment.model'
import Story from '../models/Story.model'
import User from '../models/User.model'
import UserUtil from './User.util'
import PaginationUtil from './Pagination.util'
import NotificationUtil from './Notification.util'
import NotificationTypeEnum from '../enums/notification/NotificationType.enum'

/**
 * @param { {
 * moreWhere: import("sequelize").Filterable<any>["where"],
 * moreOptions: import("sequelize").FindOptions,
 * moreInclude: import("sequelize").FindOptions<any>["include"];
 * }  } options
 *
 * @returns {import("sequelize").FindOptions}
 */
const findAllCommentOptions = (options) => {
  return {
    where: {
      ...options.moreWhere,
    },
    include: [
      {
        model: User,
        required: true,
        attributes: [...UserUtil.getPublicInfoAttribute()],
      },
      ...options.moreInclude,
    ],
    attributes: {
      exclude: ['UserId', 'StoryId', 'parentId'],
    },
    ...options.moreOptions,
  }
}

// Định nghĩa một hàm async để xử lý từng comment
const fetchChildrenForComment = async (comment) => {
  const children = await getAllChildComments(comment.id)
  comment.setDataValue('children', children)
  return comment
}

const getAllChildComments = async (commentId) => {
  const comments = await Comment.findAll(
    findAllCommentOptions({
      moreWhere: {
        parentId: commentId,
      },
      moreInclude: [],
    })
  )

  // Sử dụng Promise.all với một mảng các hàm async đã định nghĩa trước
  const commentsWithChildren = await Promise.all(
    comments.map(fetchChildrenForComment)
  )

  return commentsWithChildren
}

const CommentUtil = {
  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindAndCountOptions
   * }  } options
   */
  getAllByStory: async (storyId, storySlug, page, perPage) => {
    const comments = await PaginationUtil.paginate(
      Comment,
      page,
      perPage,
      findAllCommentOptions({
        moreWhere: {
          parentId: {
            [Op.is]: null,
          },
        },
        moreOptions: {
          order: [['createdAt', 'DESC']],
        },
        moreInclude: [
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
      })
    )

    const parentComments = comments.data

    // Sử dụng Promise.all với một mảng các hàm async đã định nghĩa trước
    comments.data = await Promise.all(
      parentComments.map(fetchChildrenForComment)
    )

    return comments
  },

  pushNotification: async (authComment, comment, parentComment, story) => {
    let userReceive
    const contentNotify = {
      userName: authComment.fullName,
      commentId: comment.id,
      story: story,
    }

    if (comment.parentId) {
      if (parentComment.UserId === authComment.id) return
      userReceive = parentComment.UserId
      contentNotify.type = NotificationTypeEnum.COMMENT_REPLY
    } else {
      if (story.UserId === authComment.id) return
      userReceive = story.UserId
      contentNotify.type = NotificationTypeEnum.COMMENT_NEW
    }

    await NotificationUtil.createNotification(
      contentNotify,
      authComment.avatar,
      userReceive
    )
  },
}

export default CommentUtil
