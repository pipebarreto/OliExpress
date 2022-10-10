import mongoose, { Document } from 'mongoose'
import { EnumType } from 'typescript'

export type ProductDocument = Document & {
  name: string
  description: string
  category: EnumType
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
  category: {
    type: String,
    enum: ['Fashion', 'Technology', 'Toys', 'Furniture', 'Other'],
    default: 'Other',
    required: false,
  },
  image: {
    type: String,
  },
})

export default mongoose.model<ProductDocument>('Product', serviceSchema)
