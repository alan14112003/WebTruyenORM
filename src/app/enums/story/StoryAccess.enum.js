const StoryAccessEnum = {
  PRIVATE: 0,
  PUBLIC: 1,

  allName() {
    return {
      [this.PRIVATE]: 'chỉ mình tôi',
      [this.PUBLIC]: 'mọi người',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default StoryAccessEnum
