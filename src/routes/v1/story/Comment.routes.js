import express from 'express'
import AuthMiddleware from '@/app/www/middleware/Auth.middleware'
import ValidatorMiddleware from '@/app/www/middleware/Validator.middleware'
import CommentInsertValidator from '@/app/www/validators/body/comment/Insert.validator'
import CommentController from '@/app/www/controllers/story/Comment.controller'
import CommentUpdateValidator from '@/app/www/validators/body/comment/Update.validator'
// lấy ra bộ định tuyến
const CommentRouter = express.Router()

const PERMISSION_NAME = 'comments.'
const PERMISSION_CODE = {
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  delete: PERMISSION_NAME + 'delete',
}

CommentRouter.post(
  '/',
  AuthMiddleware.checkPermission(PERMISSION_CODE.insert),
  ValidatorMiddleware.validateBody(CommentInsertValidator),
  CommentController.insert
)

CommentRouter.put(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.update),
  ValidatorMiddleware.validateBody(CommentUpdateValidator),
  CommentController.update
)

CommentRouter.delete(
  '/:id',
  AuthMiddleware.checkPermission(PERMISSION_CODE.delete),
  CommentController.delete
)

export default CommentRouter
