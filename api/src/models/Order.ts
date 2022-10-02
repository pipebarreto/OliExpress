import mongoose, { Document } from 'mongoose'
import Product from './Product'

export type OrderDocument = Document & {
  product: object
  quantity: number
}

const serviceSchema = new mongoose.Schema({
  product: {
    type: Product,
    index: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<OrderDocument>('Order', serviceSchema)
