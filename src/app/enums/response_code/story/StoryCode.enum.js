function createCodeEnum(prefix) {
  return {
    notFound: prefix + 'not_found',
    accessDenined: prefix + 'access_denined',
    notPrivate: prefix + 'not_private',
    minChapterPublic: prefix + 'min_chapter_public',
  }
}

const StoryCodeEnum = createCodeEnum('story.')

export default StoryCodeEnum
