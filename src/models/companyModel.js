import mongoose from 'mongoose'

const { Schema } = mongoose

const companySchema = new Schema(
  {
    name: Schema.Types.String,
    url: Schema.Types.String,
    logo: Schema.Types.String,
    date: Schema.Types.String,
  },
  // timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
  { timestamps: true }
)

const Country = mongoose.model('Company', companySchema)

export default Country
