import HistoryStory from '../models/HistoryStory.model'

const HistoryUtil = {
  setHistoryStory: async (userId, storyId, chapterId) => {
    const [historyStory] = await HistoryStory.findOrBuild({
      where: {
        UserId: userId,
        StoryId: storyId,
      },
    })

    if (historyStory.ChapterId !== chapterId) {
      historyStory.ChapterId = chapterId
      await historyStory.save()
    }
    return historyStory
  },
}

export default HistoryUtil
