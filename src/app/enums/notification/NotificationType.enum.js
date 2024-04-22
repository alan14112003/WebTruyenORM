const NotificationTypeEnum = {
  COMMENT_NEW: 1,
  COMMENT_REPLY: 5,
  LIKE_STORY: 10,
  FOLLOW_STORY: 40,
  TRANSACTION_HISTORY_IN: 20,

  allName() {
    return {
      [this.COMMENT_NEW]: 'bình luận',
      [this.COMMENT_REPLY]: 'trả lời bình luận',
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
