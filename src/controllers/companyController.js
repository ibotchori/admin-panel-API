import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Company from '../models/companyModel'
import companyRegistrationSchema from '../schemas/companyRegistrationSchema'
// @desc Get all companies
// @route GET /api/companies
// @access Private
export const getCompanies = asyncHandler(async (req, res) => {
  // get all companies from database
  const companies = await Company.find()
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
  //  see created company on response
  res.status(200).json(company)
})

// @desc Get specific company
// @route GET /api/companies/:id
// @access Private
export const getCompany = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // get specific company from database by id
    const company = await Company.findById(req.params.id)
    if (!company) {
      res.status(400)
      throw new Error('No company found with this id.')
    }
    // show company on response
    res.status(200).json(company)
  } else {
    res.status(422)
    throw new Error('ObjectID format is required.')
  }
})

// @desc  Update Companies
// @route PUT /api/companies/:id
// @access Private
export const updateCompany = asyncHandler(async (req, res) => {
  // get company from database by id
  const company = await Company.findById(req.params.id)

  if (!company) {
    res.status(400)
    throw new Error('Company not found')
  }

  // update company
  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  // see updated company on response
  res.status(200).json(updatedCompany)
})

// @desc Delete company
// @route PUT /api/companies/:id
// @access Private
export const deleteCompany = asyncHandler(async (req, res) => {
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
    throw new Error('ObjectID format is required.')
  }
})
