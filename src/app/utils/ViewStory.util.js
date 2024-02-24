import RedisConfig from '@/config/Redis.config'
import ViewStory from '../models/ViewStory.model'

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
      RedisConfig.delWithPrefix(`stories:get.${storyId}`)
    }
    return viewStory
  },
}

export default ViewStoryUtil
