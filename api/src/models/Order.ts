import mongoose, { Document, Schema } from 'mongoose'
import { ProductDocument } from './Product'
import { UserDocument } from './User'

export type OrderDocument = Document & {
  product: ProductDocument
  quantity: number
  total_price: number
  ownerId: UserDocument
}

const serviceSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model<OrderDocument>('Order', serviceSchema)
