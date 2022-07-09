import asyncHandler from 'express-async-handler'
import Company from '../models/companyModel'

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
  // creating a company
  const company = await Company.create({
    name: req.body.name,
    url: req.body.url,
    logo: req.body.logo,
    date: req.body.date,
  })
  //  see created company on response
  res.status(200).json(company)
})

// @desc Get specific company
// @route GET /api/companies/:id
// @access Private
export const getCompany = asyncHandler(async (req, res) => {
  // get specific company from database by id
  const company = await Company.findById(req.params.id)

  if (!company) {
    res.status(400)
    throw new Error('Company not found')
  }
  // show company on response
  res.status(200).json(company)
})

// @desc  Update Companies
// @route PUT /api/companies/:id
// @access Private
export const updateCompanies = asyncHandler(async (req, res) => {
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
export const deleteCompanies = asyncHandler(async (req, res) => {
  // get company from database by id
  const company = await Company.findById(req.params.id)
  // if no company found, trow the error
  if (!company) {
    res.status(200)
    throw new Error('Company not found')
  }

  // remove company from database
  await company.remove()
  // see removed company id response
  res.status(200).json({ id: req.params.id })
})
