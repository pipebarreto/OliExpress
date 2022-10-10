import mongoose, { Document } from 'mongoose'
import { OrderDocument } from './Order'

export type UserDocument = Document & {
  name: string
  email: string
  password: string
  isAdmin: boolean
  order: OrderDocument
}

const serviceSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    index: true,
  },
  picture: {
    type: String,
  },
  address: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: false,
    },
  ],
})

export default mongoose.model<UserDocument>('User', serviceSchema)
