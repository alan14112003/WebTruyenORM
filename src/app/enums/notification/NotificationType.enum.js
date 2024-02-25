const NotificationTypeEnum = {
  COMMENT: 1,
  LIKE_STORY: 2,

  allName() {
    return {
      [this.COMMENT]: 'bình luận',
      [this.LIKE_STORY]: 'thích truyện',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default NotificationTypeEnum
