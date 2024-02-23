import Purchases from '../models/Purchase.model'

const PurchaseUtil = {
  getTransaction: async (userId, chapterId) => {
    return await Purchases.findOne({
      where: {
        UserId: userId,
        ChapterId: chapterId,
      },
    })
  },
}

export default PurchaseUtil
