import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'
import { UserDocument } from '../models/User'
import User from '../models/User'
import userService from './user.service'

const create = async (order: OrderDocument): Promise<UserDocument | any> => {
  order.save().then((orderDocument) => {
    return User.findOneAndUpdate(
      { _id: orderDocument.ownerId },
      { $push: { orders: orderDocument._id } },
      { new: true }
    )
  })
}

const findAll = async (): Promise<OrderDocument[]> => {
  return Order.find().populate('product').populate('ownerId')
}

const findById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(orderId)
    .populate('product')
    .populate('ownerId')

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }

  return foundOrder
}

const deleteOrder = async (
  orderId: string,
  userId: any
): Promise<OrderDocument | null> => {
  const foundOrder = Order.findByIdAndDelete(orderId)
  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  } else {
    User.findOneAndUpdate(
      { _id: userId.userId },
      { $pull: { orders: orderId } }
    )
  }
  return foundOrder
}

const updateOrder = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  })
  if (!foundOrder) {
    throw new NotFoundError(`Order ${foundOrder} not found`)
  }

  return foundOrder
}

export default {
  findAll,
  create,
  deleteOrder,
  updateOrder,
  findById,
}
