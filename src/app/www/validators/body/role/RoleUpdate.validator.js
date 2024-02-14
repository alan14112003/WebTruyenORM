import Joi from 'joi'

const RoleUpdateValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  code: Joi.string(),
  permissions: Joi.string(),
})

export default RoleUpdateValidator
