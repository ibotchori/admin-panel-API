/* eslint-disable no-useless-escape */
import Joi from 'joi'

const employeeRegistrationSchema = async () =>
  Joi.object({
    companyID: Joi.string().required().messages({
      'any.required': 'CompanyID field is required.',
    }),
    name: Joi.string().min(2).max(30).required().messages({
      'string.empty': `Name cannot be an empty field.`,
      'string.base': 'Name field should be string.',
      'string.min': 'Name field should be at lease {#limit} characters long.',
      'string.max': 'Name field should be maximum {#limit} characters long.',
      'any.required': 'Name field is required.',
    }),
    surname: Joi.string().min(2).max(30).required().messages({
      'string.empty': `Surname cannot be an empty field.`,
      'string.base': 'Surname field should be string.',
      'string.min':
        'Surname field should be at lease {#limit} characters long.',
      'string.max': 'Surname field should be maximum {#limit} characters long.',
      'any.required': 'Surname field is required.',
    }),
    startingDate: Joi.date().iso().required().messages({
      'any.required': 'Starting date field is required.',
      'date.format': `Date format is YYYY-MM-DD.`,
    }),
    dayOfBirth: Joi.date().iso().required().messages({
      'any.required': 'Day of birth field is required.',
      'date.format': `Date format is YYYY-MM-DD.`,
    }),
    personalNumber: Joi.string().length(11).required().messages({
      'any.required': 'Personal Number field is required.',
      'string.length': `Personal Number field should be {#limit} characters long.`,
    }),
    position: Joi.string().min(2).max(30).required().messages({
      'string.empty': `Position cannot be an empty field.`,
      'string.base': 'Position field should be string.',
      'string.min':
        'Position field should be at lease {#limit} characters long.',
      'string.max':
        'Position field should be maximum {#limit} characters long.',
      'any.required': 'Position field is required.',
    }),
  })

export default employeeRegistrationSchema
