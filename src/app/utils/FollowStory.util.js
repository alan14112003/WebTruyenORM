import RedisConfig from '@/config/Redis.config'
import NotificationTypeEnum from '../enums/notification/NotificationType.enum'
import Story from '../models/Story.model'
import NotificationUtil from './Notification.util'
import StoryKeyEnum from '../enums/redis_key/StoryKey.enum'

const FollowStoryUtil = {
  pushNotification: async (authFollow, storyId) => {
    let story = await RedisConfig.get(`${StoryKeyEnum.GET}.${storyId}`)

    if (!story) {
      story = await Story.findByPk(storyId)
    }

    if (authFollow.id === story.UserId) {
      return
    }

    const contentNotify = {
      type: NotificationTypeEnum.FOLLOW_STORY,
      userName: authFollow.fullName,
      story: story,
    }

    await NotificationUtil.createNotification(
      contentNotify,
      authFollow.avatar,
      story.UserId
    )
  },
}

export default FollowStoryUtil
