import RedisConfig from '@/config/Redis.config'
import NotificationTypeEnum from '../enums/notification/NotificationType.enum'
import Story from '../models/Story.model'
import NotificationUtil from './Notification.util'
import StoryKeyEnum from '../enums/redis_key/StoryKey.enum'

const LikeStoryUtil = {
  pushNotification: async (authLike, storyId) => {
    let story = await RedisConfig.get(`${StoryKeyEnum.GET}.${storyId}`)

    if (!story) {
      story = await Story.findByPk(storyId)
    }

    if (authLike.id === story.UserId) {
      return
    }

    const contentNotify = {
      type: NotificationTypeEnum.LIKE_STORY,
      userName: authLike.fullName,
      story: story,
    }

    await NotificationUtil.createNotification(
      contentNotify,
      authLike.avatar,
      story.UserId
    )
  },
}

export default LikeStoryUtil
