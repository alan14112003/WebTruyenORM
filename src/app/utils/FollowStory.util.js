import RedisConfig from '@/config/Redis.config'
import NotificationTypeEnum from '../enums/notification/NotificationType.enum'
import Story from '../models/Story.model'
import NotificationUtil from './Notification.util'
import StoryKeyEnum from '../enums/redis_key/StoryKey.enum'

const FollowStoryUtil = {
  pushNotification: async (authFollow, storyId) => {
    let content = `${authFollow.fullName} đã `

    let story = await RedisConfig.get(`${StoryKeyEnum.GET}.${storyId}`)

    if (!story) {
      story = await Story.findByPk(storyId)
    }

    content += `thích truyện <b>${story.name}</b> của bạn`

    const contentNotify = NotificationUtil.createContentNotify(
      NotificationTypeEnum.FOLLOW_STORY,
      content
    )
    contentNotify.storyId = storyId

    await NotificationUtil.createNotification(
      contentNotify,
      authFollow.avatar,
      story.UserId
    )
  },
}

export default FollowStoryUtil
