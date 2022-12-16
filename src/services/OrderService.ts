import { Op } from 'sequelize'
import { OrderDao } from '../daos/OrderDao'
import { ProductDao } from '../daos/ProductDao'
import { QueryParams } from '../interfaces/QueryParams' // eslint-disable-line
import {Order, OrderDetail} from '../models' // eslint-disable-line

export class OrderService {
  private orderDao: OrderDao
  private productDao: ProductDao
  constructor () {
    this.orderDao = new OrderDao()
    this.productDao = new ProductDao()
  }

  public placeOrder = async (cartDetailIds, order: Partial<Order>) => {
    const product: any = await this.productDao.findOne(orderDetail.productId)
    if(product.isSuccess){
      orderDetail.price = product.getValue()?.price
      const newOrder = await this.orderDao.addToOrder(orderDetail, order)
      return newOrder
    }
    return product
  }

  public deleteOrder = async (orderId: string) => {
    const response = await this.orderDao.delete(orderId)
    return response
  }

  public getOrderByUserId = async (userId: string) => {
    const response = await this.orderDao.getOrderDetailByUserId(userId)
    return response
  }

  public updateOrder = async (orderId: string, newOrder) => {
    const order = await this.orderDao.update(orderId, newOrder)
    return order || null
  }
}
