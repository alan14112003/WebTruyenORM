import TransactionHistoryController from '@/app/www/controllers/auth/TransactionHistory.controller'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import TransactionHistoryInsertValidator from '@/app/www/validators/body/transaction_history/Insert.validator'
import express from 'express'
// lấy ra bộ định tuyến
const TransactionHistoryRouter = express.Router()

const PERMISSION_NAME = 'transaction_history.'
const PERMISSION_CODE = {
  insert: PERMISSION_NAME + 'insert',
}

TransactionHistoryRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(TransactionHistoryInsertValidator),
  TransactionHistoryController.insert
)

export default TransactionHistoryRouter
