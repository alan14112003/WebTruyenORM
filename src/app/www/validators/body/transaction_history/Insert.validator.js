import TransactionHistoryTypeEnum from '@/app/enums/transaction_history/TransactionHistoryType.enum'
import Joi from 'joi'

const TransactionHistoryInsertValidator = Joi.object({
  money: Joi.number().required(),
  type: Joi.number()
    .required()
    .integer()
    .valid(
      ...Object.keys(TransactionHistoryTypeEnum.allName()).map((k) => Number(k))
    ),
})

export default TransactionHistoryInsertValidator
