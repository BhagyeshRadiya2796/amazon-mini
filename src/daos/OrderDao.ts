import { Sequelize } from 'sequelize'
import { RepoError, Result } from '../helpers/Result'
import { RepoResult } from '../interfaces/CommonCrud' // eslint-disable-line
import { Order, OrderDetail, Product, User } from '../models'
import { BaseDao } from './BaseDao'
export class OrderDao extends BaseDao<Order> {
  constructor () {
    super(Order)
  }
  public addToOrder = async (orderDetail: OrderDetail, order: Partial<Order>): RepoResult<any> => {
    // try {
    //   const createdOrderId = await this.findOrCreate(order as Order)
    //   orderDetail.orderId = createdOrderId
    //   const [[affectedRows, affectedCounts]] = await OrderDetail.increment(
    //     {
    //       quantity: orderDetail.quantity
    //     }, 
    //     { 
    //       where:{
    //         orderId: createdOrderId, 
    //         productId: orderDetail.productId
    //       }
    //     },
    //   )
    //   if(!affectedCounts){
    //     await OrderDetail.create(orderDetail)
    //   }
    //   return Result.ok({ orderId: createdOrderId })
    // } catch (ex: any) {
    //   console.log('error', ex)
    //   return Result.fail(new RepoError(ex.message, 500))
    // }
  }
  findOrCreate = async (order: Order) => {
    const [createdOrder, isCreated] = await Order.findOrCreate({
      where: {
        buyerId: order.buyerId
      },
      defaults: order
    })
    return createdOrder && createdOrder.id
  }

  public getOrderDetailByUserId = async (userId) => {
    try {
      const orderDetail: any = await Order.findAll({
        where: {
          buyerId: userId
        },
        attributes:['id', [Sequelize.col('user.first_name'), 'username']],
        include: [
          {
            model: User,
            attributes: []
          },
          {
            model: Product,
            attributes: ['id', 'name', 'description'],
            through: {
              attributes: ['quantity', 'price']
            }
          }
        ]
      })
      if (!orderDetail) {
        return Result.fail(new RepoError('No data found', 404))
      }else {
        const responseData = orderDetail[0].toJSON()
        responseData.Products = responseData.Products.map((product) => {
          let finalObj = Object.assign({}, product.OrderDetail)
          delete product.OrderDetail
          finalObj = Object.assign(finalObj, product)
          return finalObj
        })
        return Result.ok(responseData)
      }
    } catch (ex: any) {
      console.log(ex);
      
      return Result.fail(new RepoError(ex.message, 500))
    }
  }
}
