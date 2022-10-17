import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ name: 1 })
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)
  if (!foundProduct) {
    throw new NotFoundError(`Products ${productId} not found`)
  }
  return foundProduct
}

const findByProductName = async (
  productName: string
): Promise<ProductDocument[]> => {
  const foundProduct = await Product.find({ name: productName })
  if (!foundProduct) {
    throw new NotFoundError(`Products ${productName} not found`)
  }
  return foundProduct
}

const deleteProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  const foundProduct = Product.findByIdAndDelete(productId)
  if (!foundProduct) {
    throw new NotFoundError(`Products ${productId} not found`)
  }
  return foundProduct
}

const updateProduct = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })
  if (!foundProduct) {
    throw new NotFoundError(`Product ${foundProduct} not found`)
  }

  return foundProduct
}

export default {
  findAll,
  create,
  deleteProduct,
  updateProduct,
  findById,
  findByProductName,
}
