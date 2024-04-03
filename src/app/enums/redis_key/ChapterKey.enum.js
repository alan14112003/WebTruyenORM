function createKeyEnum(name) {
  return {
    ALL_BY_AUTH: name + 'auth.all',
    ALL: name + 'all',
    GET: name + 'get',
  }
}

const ChapterKeyEnum = createKeyEnum('chapters:')

export default ChapterKeyEnum
