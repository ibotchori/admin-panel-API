import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Company from '../models/companyModel'
import Employee from '../models/employeeModel'
import companyRegistrationSchema from '../schemas/companyRegistrationSchema'

// @desc Get all companies
// @route GET /api/companies
// @access Private
export const getCompanies = asyncHandler(async (req, res) => {
  // get all companies from database
  const companies = await Company.find(
    {},
    // extract only specific fields
    {
      name: 1,
      url: 1,
      logo: 1,
      date: 1,
    }
  )
  if (companies.length === 0) {
    res.status(400)
    throw new Error('No companies found')
  }
  // show all companies on response
  res.status(200).json(companies)
})

// @desc Create new company
// @route POST /api/companies
// @access Private
export const setCompany = asyncHandler(async (req, res) => {
  /* Validation with Joi */
  const validator = await companyRegistrationSchema(req.body)
  const { value: data, error } = validator.validate(req.body)

  if (error) {
    //  return res.status(422).json(error.details)
    res.status(422)
    throw new Error(error.details[0].message)
  }

  // value from Joi
  const { name, url, logo, date } = data
  // creating a company
  const company = await Company.create({
    name,
    url,
    logo,
    date,
  })
  //  see created company ID on response
  res.status(200).json({ _id: company._id })
})

// @desc Get specific company
// @route GET /api/companies/:id
// @access Private
export const getCompany = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific company from database by id
    const company = await Company.findById(req.params.id)
    if (!company) {
      res.status(400)
      throw new Error('No company found with this id.')
    }
    // extract data from founded company
    const { name, url, logo, date, _id } = company

    // find employees with same companyID
    const employees = await Employee.find(
      { companyID: req.params.id },
      // extract only specific fields
      {
        name: 1,
        surname: 1,
        startingDate: 1,
        dayOfBirth: 1,
        personalNumber: 1,
        position: 1,
      }
    )

    // show company with employees on response
    res.status(200).json({
      _id,
      name,
      url,
      logo,
      date,
      employees,
    })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Update Companies
// @route PUT /api/companies/:id
// @access Private
export const updateCompany = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific company from database by id
    const company = await Company.findById(req.params.id)
    if (!company) {
      res.status(400)
      throw new Error('There is no company with this ID.')
    }
    /* Validation with Joi */
    const validator = await companyRegistrationSchema(req.body)
    const { value: data, error } = validator.validate(req.body)

    if (error) {
      //  return res.status(422).json(error.details)
      res.status(422)
      throw new Error(error.details[0].message)
    }

    // value from Joi
    const { name, url, logo, date } = data
    // update company
    await Company.findByIdAndUpdate(
      req.params.id,
      { name, url, logo, date },
      {
        new: true,
      }
    )

    // see updated company on response
    res.status(200).json({ name, url, logo, date })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})

// @desc Delete company
// @route DELETE /api/companies/:id
// @access Private
export const deleteCompany = asyncHandler(async (req, res) => {
  // validate ObjectID with mongoose
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific company from database by id
    const company = await Company.findById(req.params.id)
    if (!company) {
      res.status(400)
      throw new Error('No company found with this id.')
    }
    // remove company from database
    await company.remove()
    // see removed company id response
    res.status(200).json({ id: req.params.id })
  } else {
    res.status(422)
    throw new Error('Params should be ObjectID format.')
  }
})
