import mongoose, { Document, Schema } from 'mongoose'

export type OrderDocument = Document & {
  product: object
  quantity: number
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
})

export default mongoose.model<OrderDocument>('Order', serviceSchema)
