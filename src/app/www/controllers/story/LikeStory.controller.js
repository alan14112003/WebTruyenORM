import LikeStoryKeyEnum from '@/app/enums/redis_key/LikeStoryKey.enum'
import StoryKeyEnum from '@/app/enums/redis_key/StoryKey.enum'
import LikeStory from '@/app/models/LikeStory.model'
import LikeStoryUtil from '@/app/utils/LikeStory.util'
import RedisConfig from '@/config/Redis.config'

const LikeStoryController = {
  get: async (req, res, next) => {
    try {
      const auth = req.user
      const { storyId } = req.params
      const redisKey = `${LikeStoryKeyEnum.GET}.${auth.id}.${storyId}`

      let likeStory = await RedisConfig.get(redisKey)

      if (!likeStory) {
        likeStory = await LikeStory.findOne({
          where: {
            StoryId: storyId,
            UserId: auth.id,
          },
        })
      }

      RedisConfig.set(redisKey, likeStory)

      return res.status(200).json(likeStory)
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const auth = req.user
      const { storyId } = req.params
      const redisKey = `${LikeStoryKeyEnum.GET}.${auth.id}.${storyId}`

      let likeStory = await RedisConfig.get(redisKey)
      let createdFlag

      if (!likeStory) {
        const [likeStoryNew, created] = await LikeStory.findOrCreate({
          where: {
            StoryId: storyId,
            UserId: auth.id,
          },
        })

        likeStory = likeStoryNew
        createdFlag = created
      }

      if (createdFlag) {
        RedisConfig.set(redisKey, likeStory)
        LikeStoryUtil.pushNotification(auth, storyId)
      } else {
        await LikeStory.destroy({
          where: {
            StoryId: storyId,
            UserId: auth.id,
          },
        })

        RedisConfig.del(redisKey)
      }

      RedisConfig.del(`${StoryKeyEnum.GET}.${storyId}`)

      return res.status(200).json('success')
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
}

export default LikeStoryController
