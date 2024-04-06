const NotificationTypeEnum = {
  COMMENT: 1,
  LIKE_STORY: 2,
  TRANSACTION_HISTORY_IN: 3,

  allName() {
    return {
      [this.COMMENT]: 'bình luận',
      [this.LIKE_STORY]: 'thích truyện',
      [this.TRANSACTION_HISTORY_IN]: 'nạp tiền',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default NotificationTypeEnum
