function createCodeEnum(prefix) {
  return {
    notFound: prefix + 'not_found',
  }
}

const StoryCodeEnum = createCodeEnum('story.')

export default StoryCodeEnum
