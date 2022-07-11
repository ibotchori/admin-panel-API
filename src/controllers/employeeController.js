import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Employee from '../models/employeeModel'

// @desc Create new employee
// @route POST /api/employees
// @access Private
export const setEmployee = asyncHandler(async (req, res) => {
  // creating a specific user goals
  const employee = await Employee.create({
    companyID: req.body.companyID,
    name: req.body.name,
    surname: req.body.surname,
    startingDate: req.body.startingDate,
    dayOfBirth: req.body.dayOfBirth,
    personalNumber: req.body.personalNumber,
    position: req.body.position,
  })

  //  see created employee on response
  res.status(200).json(employee)
})
