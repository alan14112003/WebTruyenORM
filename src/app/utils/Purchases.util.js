import Purchases from '../models/Purchases.model'

const PurchasesUtil = {
  getTransaction: async (userID, chapterId) => {
    return await Purchases.findOne({
      where: {
        UserID: userID,
        ChapterId: chapterId,
      },
    })
  },
}

export default PurchasesUtil
