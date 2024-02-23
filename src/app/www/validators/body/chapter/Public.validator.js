import Joi from 'joi'

const ChapterPublicValidator = Joi.object({
  ids: Joi.array().required().items(Joi.number().required()),
})

export default ChapterPublicValidator
