import Joi from 'joi'

const PurchaseBuyChapterValidator = Joi.object({
  ChapterId: Joi.number().required(),
})

export default PurchaseBuyChapterValidator
