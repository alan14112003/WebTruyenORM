function createKeyEnum(name) {
  return {
    ALL: name + 'all',
    GET: name + 'get',
  }
}

const StoryKeyEnum = createKeyEnum('stories:')

export default StoryKeyEnum
