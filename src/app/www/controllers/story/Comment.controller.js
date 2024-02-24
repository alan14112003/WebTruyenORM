import CommentKeyEnum from '@/app/enums/redis_key/CommentKey.enum'
import StoryKeyEnum from '@/app/enums/redis_key/StoryKey.enum'
import Comment from '@/app/models/Comment.model'
import Story from '@/app/models/Story.model'
import RedisConfig from '@/config/Redis.config'

const CommentController = {
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
      }

      commentDTO.UserId = auth.id

      await Comment.create(commentDTO)

      RedisConfig.delWithPrefix(CommentKeyEnum.ALL)

      return res.status(201).json('created')
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}

export default CommentController
