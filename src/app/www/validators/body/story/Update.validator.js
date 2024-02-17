import Joi from 'joi'

const CategoryUpdateValidator = Joi.object({
  name: Joi.string().required(),
})

export default CategoryUpdateValidator
