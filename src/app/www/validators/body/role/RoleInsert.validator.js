import Joi from 'joi'

const RoleObjectValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  code: Joi.string().required(),
  permissions: Joi.string().required(),
})

const RoleInsertValidator = Joi.alternatives().try(
  RoleObjectValidator,
  Joi.array().items(RoleObjectValidator)
)

export default RoleInsertValidator
