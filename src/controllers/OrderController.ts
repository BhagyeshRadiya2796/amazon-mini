import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import {ControllerBase} from '../interfaces/ControllerBase' // eslint-disable-line
import { OrderService } from '../services/OrderService'
import { Order, OrderDetail } from '../models' // eslint-disable-line
import { AuthMiddleware } from '../middleware/AuthMiddleware'
import { GrantAccess, SchemaValidate } from '../middleware'
import { placeOrder } from '../validation/orderSchema'

export class OrderController implements ControllerBase {
  public path = '/orders'
  public router = express.Router()
  public orderService: OrderService

  constructor () {
    this.initRoutes()
    this.orderService = new OrderService()
  }

  public initRoutes () {
    // this.router.get('/orders', this.getAll)
    this.router.get(`${this.path}`, AuthMiddleware, GrantAccess('orders'), this.getOrderDetails)
    this.router.post(this.path, AuthMiddleware, GrantAccess('orders'), SchemaValidate(placeOrder), this.post)
    // this.router.put(`${this.path}/:orderId`, AuthMiddleware, GrantAccess('orders'),this.update)
    // this.router.delete(`${this.path}/:orderId`, AuthMiddleware, GrantAccess('orders'), this.delete)
  }

  post = async (req: Request, res: Response) => {
    const { cartDetailIds } = req.body
    let orderInfo: Partial<Order> = {}
    orderInfo.buyerId = res.locals.user.id
    const response = await this.orderService.placeOrder(cartDetailIds, orderInfo)
    if(response.isSuccess){
      ResponseHandler.success(res, response.getValue())
    }else {
      ResponseHandler.fail(res, response.getError())
    }
  }

  getOrderDetails = async (req: Request, res: Response) => {
    const { id:userId } = res.locals.user
    const response = await this.orderService.getOrderByUserId(userId)
    if (response.isSuccess) {
      ResponseHandler.success(res, response.getValue())
    } else {
      ResponseHandler.fail(res, response.getError())
    }
  }

  // getAll = async (req: Request, res: Response) => {
  //   const filters = req.query
  //   const response = await this.orderService.getOrders(filters)
  //   if (response.isSuccess) {
  //     ResponseHandler.success(res, response.getValue())
  //   } else {
  //     ResponseHandler.fail(res, response.getError())
  //   }
  // }

  // delete = async (req: Request, res: Response) => {
  //   const pathParams = req.params
  //   const order = await this.orderService.getOrderById(pathParams.orderId)
  //   if (order.isSuccess) {
  //     const response = await this.orderService.deleteOrder(pathParams.orderId)
  //     if (response.isSuccess) {
  //       ResponseHandler.success(res, response.getValue())
  //     } else {
  //       ResponseHandler.fail(res, response.getError())
  //     }
  //   } else {
  //     ResponseHandler.fail(res, { message: 'Order not found', code: 404 })
  //   }
  // }
}
