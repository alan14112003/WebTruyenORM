const StoryTypeEnum = {
  WORD: 1,
  COMIC: 2,
  SPEECH: 3,

  allName() {
    return {
      [this.WORD]: 'truyện chữ',
      [this.COMIC]: 'truyện tranh',
      [this.SPEECH]: 'truyện nói',
    }
  },

  getNameByValue(value) {
    return this.allName()[value]
  },
}

export default StoryTypeEnum
