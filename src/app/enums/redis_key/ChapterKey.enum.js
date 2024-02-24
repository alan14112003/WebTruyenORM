function createKeyEnum(name) {
  return {
    ALL: name + 'all',
    GET: name + 'get',
  }
}

const ChapterKeyEnum = createKeyEnum('chapters:')

export default ChapterKeyEnum
