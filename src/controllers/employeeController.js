import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Employee from '../models/employeeModel'
import employeeRegistrationSchema from '../schemas/employeeRegistrationSchema'

// @desc Create new employee
// @route POST /api/employees
// @access Private
export const setEmployee = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.body.companyID)) {
    /* Validation with Joi */
    const validator = await employeeRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      res.status(422)
      throw new Error(error.details[0].message)
    }

    // value from Joi
    const {
      companyID,
      name,
      surname,
      startingDate,
      dayOfBirth,
      personalNumber,
      position,
    } = data
    // creating a employee
    const employee = await Employee.create({
      companyID,
      name,
      surname,
      startingDate,
      dayOfBirth,
      personalNumber,
      position,
    })

    //  see created employee on response
    res.status(200).json(employee)
  } else {
    res.status(422)
    throw new Error('ObjectID format is required.')
  }
})
