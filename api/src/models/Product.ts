import mongoose, { Document, Schema } from 'mongoose'

export type ProductDocument = Document & {
  _id: Schema.Types.ObjectId
  name: string
  description: string
  price: number
}

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<ProductDocument>('Product', serviceSchema)
