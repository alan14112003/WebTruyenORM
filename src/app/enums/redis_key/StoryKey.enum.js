function createKeyEnum(name) {
  return {
    ALL_BY_AUTH: name + 'all.auth',
    GET_BY_AUTH: name + 'get.auth',
    ALL: name + 'all',
    GET: name + 'get',
  }
}

const StoryKeyEnum = createKeyEnum('stories:')

export default StoryKeyEnum
