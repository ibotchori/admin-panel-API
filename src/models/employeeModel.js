import mongoose from 'mongoose'

const { Schema } = mongoose

const employeeSchema = new Schema(
  {
    companyID: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    name: Schema.Types.String,
    surname: Schema.Types.String,
    startingDate: Schema.Types.String,
    dayOfBirth: Schema.Types.String,
    personalNumber: Schema.Types.String,
    position: Schema.Types.String,
  },
  // timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
  { timestamps: true }
)

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
