const NotificationTypeEnum = {
  COMMENT: 1,

  allName() {
    return {
      [this.COMMENT]: 'bình luận',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default NotificationTypeEnum
