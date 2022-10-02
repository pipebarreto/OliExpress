import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  name: string
  email: string
  password: number
}

const serviceSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export default mongoose.model<UserDocument>('User', serviceSchema)
