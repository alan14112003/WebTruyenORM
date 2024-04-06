import Joi from 'joi'

const SendNotifyValidator = Joi.object({
  content: Joi.string().required(),
})

export default SendNotifyValidator
