import FollowStoryKeyEnum from '@/app/enums/redis_key/FollowStoryKey.enum'
import StoryKeyEnum from '@/app/enums/redis_key/StoryKey.enum'
import StatusCodeEnum from '@/app/enums/response_code/notification/StatusCode.enum'
import FollowStory from '@/app/models/FollowStory.model'
import FollowStoryUtil from '@/app/utils/FollowStory.util'
import RedisConfig from '@/config/Redis.config'

const FollowStoryController = {
  get: async (req, res, next) => {
    try {
      const auth = req.user
      const { storyId } = req.params
      const redisKey = `${FollowStoryKeyEnum.GET}.${auth.id}.${storyId}`

      let followStory = await RedisConfig.get(redisKey)

      if (!followStory) {
        followStory = await FollowStory.findOne({
          where: {
            StoryId: storyId,
            UserId: auth.id,
          },
        })
      }

      RedisConfig.set(redisKey, followStory)

      return res.status(200).json(followStory)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const auth = req.user
      const { storyId } = req.params
      const redisKey = `${FollowStoryKeyEnum.GET}.${auth.id}.${storyId}`

      let followStory = await RedisConfig.get(redisKey)
      let createdFlag

      if (!followStory) {
        const [followStoryNew, created] = await FollowStory.findOrCreate({
          where: {
            StoryId: storyId,
            UserId: auth.id,
          },
        })

        followStory = followStoryNew
        createdFlag = created
      }

      if (createdFlag) {
        RedisConfig.set(redisKey, followStory)
        FollowStoryUtil.pushNotification(auth, storyId)
      } else {
        await FollowStory.destroy({
          where: {
            StoryId: storyId,
            UserId: auth.id,
          },
        })

        RedisConfig.del(redisKey)
      }

      RedisConfig.del(`${StoryKeyEnum.GET}.${storyId}`)

      return res.status(200).json({
        code: StatusCodeEnum.success,
        message: 'success',
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}

export default FollowStoryController
