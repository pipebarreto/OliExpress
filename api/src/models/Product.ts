import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  description: string
  price: number
  image: string
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
  image: {
    type: String,
    index: true,
  },
})

export default mongoose.model<ProductDocument>('Product', serviceSchema)
