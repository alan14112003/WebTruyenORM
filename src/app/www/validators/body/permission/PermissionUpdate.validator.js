import Joi from 'joi'

const PermissionUpdateValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  code: Joi.string(),
})

export default PermissionUpdateValidator
