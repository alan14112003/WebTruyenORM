import Joi from 'joi'

const PermissionObjectValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  code: Joi.string().required(),
})

const PermissionInsertValidator = Joi.alternatives().try(
  PermissionObjectValidator,
  Joi.array().items(PermissionObjectValidator)
)

export default PermissionInsertValidator
