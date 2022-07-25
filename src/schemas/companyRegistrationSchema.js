/* eslint-disable no-useless-escape */
import Joi from 'joi'
import Company from '../models/companyModel'

const nameShouldBeUniqueRule = (company) => (value, helper) => {
  if (!company) {
    return value
  }
  if (company.name === value) {
    return helper.message('This company is already registered.')
  }
  return value
}

const companyRegistrationSchema = async (data) => {
  const foundCompanyWithName = await Company.findOne({ name: data.name })

  return Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .custom(nameShouldBeUniqueRule(foundCompanyWithName), 'unique name')
      .required()
      .messages({
        'string.empty': `Company name cannot be an empty field.`,
        'string.base': 'Company name field should be string.',
        'string.min':
          'Company name field should be at lease {#limit} characters long.',
        'string.max':
          'Company name field should be maximum {#limit} characters long.',
        'any.required': 'Company name field is required.',
      }),

    url: Joi.string()
      .regex(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      )
      .required()
      .messages({
        'string.pattern.base': `URL format is required.`,
        'any.required': 'URL field is required.',
        'string.empty': `URL cannot be an empty field.`,
      }),
    logo: Joi.string()
      .regex(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/)
      .required()
      .messages({
        'string.pattern.base': `Logo must be image-URL format.`,
        'any.required': 'Logo field is required.',
        'string.empty': `Logo cannot be an empty field.`,
      }),
    date: Joi.date().iso().required().messages({
      'any.required': 'Date field is required.',
      'date.format': `Date format is YYYY-MM-DD.`,
    }),
  })
}

export default companyRegistrationSchema
