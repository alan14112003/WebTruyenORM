import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import PurchaseBuyChapterValidator from '@/app/www/validators/body/purchase/BuyChapter.validator'
import PurchaseController from '@/app/www/controllers/story/Purchase.controller'
// lấy ra bộ định tuyến
const PurchaseRouter = express.Router()

const PERMISSION_NAME = 'purchases.'
const PERMISSION_CODE = {
  buyChapter: PERMISSION_NAME + 'buy_chapter',
}

PurchaseRouter.post(
  '/buy-chapter',
  AuthMiddleware.checkPermission(PERMISSION_CODE.buyChapter),
  ValidatorMiddleware.validateBody(PurchaseBuyChapterValidator),
  PurchaseController.buyChapter
)

export default PurchaseRouter

export { PERMISSION_CODE as Purchase_PERMISSION_CODE }
