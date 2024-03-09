function createCodeEnum(prefix) {
  return {
    parentNotFound: prefix + 'parent_not_found',
  }
}

const CommentCodeEnum = createCodeEnum('comment.')

export default CommentCodeEnum
