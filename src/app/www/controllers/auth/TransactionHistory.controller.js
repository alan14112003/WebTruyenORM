import TransactionHistory from '@/app/models/TransactionHistory.model'
import AuthUtil from '@/app/utils/Auth.util'

const TransactionHistoryController = {
  insert: async (req, res, next) => {
    try {
      const auth = req.user
      const body = req.body

      const code = AuthUtil.generateCode()
      body.code = code
      body.UserId = auth.id

      const data = await TransactionHistory.create(body)

      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  },
}

export default TransactionHistoryController
