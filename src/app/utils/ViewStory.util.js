import RedisConfig from '@/config/Redis.config'
import ViewStory from '../models/ViewStory.model'
import StoryKeyEnum from '../enums/redis_key/StoryKey.enum'

const ViewStoryUtil = {
  setViewStory: async (userId, storyId, chapterId) => {
    const [viewStory, created] = await ViewStory.findOrCreate({
      where: {
        UserId: userId,
        StoryId: storyId,
        ChapterId: chapterId,
      },
    })

    if (created) {
      RedisConfig.delWithPrefix(`${StoryKeyEnum.GET}.${storyId}`)
    }

    return viewStory
  },
}

export default ViewStoryUtil
