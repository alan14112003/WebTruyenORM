const NotificationTypeEnum = {
  COMMENT: 1,
  LIKE_STORY: 2,
  TRANSACTION_HISTORY_IN: 3,
  FOLLOW_STORY: 4,

  allName() {
    return {
      [this.COMMENT]: 'bình luận',
      [this.LIKE_STORY]: 'thích truyện',
      [this.TRANSACTION_HISTORY_IN]: 'nạp tiền',
      [this.FOLLOW_STORY]: 'theo dõi truyện',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default NotificationTypeEnum
