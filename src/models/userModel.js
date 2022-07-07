import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  // timestamps option that tells Mongoose to automatically manage createdAt and updatedAt properties on your documents.
  { timestamps: true }
)
const User = mongoose.model('User', userSchema)

export default User
