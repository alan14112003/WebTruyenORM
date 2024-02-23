import express from 'express'
import CategoryRouter from './Category.routes'
import AuthorRouter from './Author.routes'
import StoryRouter from './Story.routes'
import ChapterRouter from './Chapter.routes'
import PurchaseRouter from './Purchase.routes'

// lấy ra bộ định tuyến
const StoryPackageRouter = express.Router()

StoryPackageRouter.use('/categories', CategoryRouter)

StoryPackageRouter.use('/authors', AuthorRouter)

StoryPackageRouter.use('/stories', StoryRouter)

StoryPackageRouter.use('/chapters', ChapterRouter)

StoryPackageRouter.use('/purchases', PurchaseRouter)

export default StoryPackageRouter
