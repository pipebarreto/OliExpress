import mongoose, { Document } from 'mongoose'
import { OrderDocument } from './Order'

export type UserDocument = Document & {
  _id: string
  name: string
  email: string
  picture: string
  password: string
  adress: string
  isAdmin: boolean
  orders: OrderDocument
}

const serviceSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    index: true,
  },
  password: {
    type: String,
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
