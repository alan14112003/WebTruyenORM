import NotifyBankController from '@/app/www/controllers/util/NotifyBank.controller'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import SendNotifyValidator from '@/app/www/validators/body/notify_bank/SendNotify.validator'
import express from 'express'
// lấy ra bộ định tuyến
const NotifyBankRouter = express.Router()

NotifyBankRouter.post(
  '/send-notify',
  ValidatorMiddleware.validateBody(SendNotifyValidator),
  NotifyBankController.sendNotify
)

export default NotifyBankRouter
