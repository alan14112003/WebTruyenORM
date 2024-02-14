import Joi from 'joi'

const CategoryObject = Joi.object({
  name: Joi.string().required(),
})

const CategoryInsertValidator = Joi.alternatives().try(
  CategoryObject,
  Joi.array().items(CategoryObject)
)

export default CategoryInsertValidator
