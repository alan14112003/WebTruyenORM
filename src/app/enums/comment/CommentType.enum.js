const CommentTypeEnum = {
  TEXT: 0,
  IMAGE: 1,

  allName() {
    return {
      [this.TEXT]: 'văn bản',
      [this.IMAGE]: 'hình ảnh',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default CommentTypeEnum
