function createCodeEnum(prefix) {
  return {
    needPurchase: prefix + 'need_purchase',
    notPrivate: prefix + 'not_private',
    notFound: prefix + 'not_found',
  }
}

const ChapterCodeEnum = createCodeEnum('chapter.')

export default ChapterCodeEnum
