import CommentKeyEnum from '@/app/enums/redis_key/CommentKey.enum'
import StoryKeyEnum from '@/app/enums/redis_key/StoryKey.enum'
import Comment from '@/app/models/Comment.model'
import Story from '@/app/models/Story.model'
import CommentUtil from '@/app/utils/Comment.util'
import RedisConfig from '@/config/Redis.config'

const CommentController = {
  allByStoryId: async (req, res, next) => {
    try {
      const { slugId } = req.params
      const { page, perPage } = req.query

      const [storySlug, storyId] = slugId.split('.-.')

      const redisKey = `${CommentKeyEnum.ALL}.${storyId}.${page}.${perPage}`
      let comments = await RedisConfig.get(redisKey)

      if (!comments) {
        comments = await CommentUtil.getAllByStory(
          storyId,
          storySlug,
          page,
          perPage
        )
      }

      RedisConfig.set(redisKey, comments)

      return res.status(200).json(comments)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  insert: async (req, res, next) => {
    try {
      const auth = req.user
      const commentDTO = req.body

      let story = await RedisConfig.get(
        `${StoryKeyEnum.GET}.${commentDTO.StoryId}`
      )

      if (!story) {
        story = await Story.findOne({
          where: {
            id: commentDTO.StoryId,
          },
        })
      }

      if (!story) {
        return res.status(400).json('story not found')
      }

      if (commentDTO.parentId) {
        let parentComment = await RedisConfig.get(
          `${CommentKeyEnum.GET}.${commentDTO.parentId}`
        )

        if (!parentComment) {
          parentComment = await Comment.findByPk(commentDTO.parentId)
        }

        if (!parentComment) {
          return res.status(400).json('parent comment not found')
        }

        RedisConfig.set(
          `${CommentKeyEnum.GET}.${commentDTO.parentId}`,
          parentComment
        )
      }

      commentDTO.UserId = auth.id

      await Comment.create(commentDTO)

      RedisConfig.delWithPrefix(`${CommentKeyEnum.ALL}.${commentDTO.StoryId}`)

      return res.status(201).json('created')
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const auth = req.user
      const { id } = req.params
      const commentDTO = req.body

      let comment = await RedisConfig.get(`${CommentKeyEnum.GET}.${id}`)
      if (!comment) {
        comment = await Comment.findByPk(id)
      }

      if (!comment) {
        return res.status(400).json('comment not found')
      }

      if (auth.id !== comment.UserId) {
        return res.status(403).json('access denined')
      }

      const [updatedCount] = await Comment.update(commentDTO, {
        where: {
          id: id,
        },
      })

      if (updatedCount) {
        RedisConfig.del(`${CommentKeyEnum.GET}.${id}`)
        RedisConfig.delWithPrefix(`${CommentKeyEnum.ALL}.${comment.StoryId}`)
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

      let comment = await RedisConfig.get(`${CommentKeyEnum.GET}.${id}`)
      if (!comment) {
        comment = await Comment.findByPk(id)
      }

      if (!comment) {
        return res.status(400).json('comment not found')
      }

      if (auth.id !== comment.UserId) {
        return res.status(403).json('access denined')
      }

      const deletedCount = await Comment.destroy({
        where: {
          id: id,
        },
      })

      if (deletedCount) {
        RedisConfig.del(`${CommentKeyEnum.GET}.${id}`)
        RedisConfig.delWithPrefix(`${CommentKeyEnum.ALL}.${comment.StoryId}`)
      }

      return res.status(200).json(deletedCount)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}

export default CommentController
