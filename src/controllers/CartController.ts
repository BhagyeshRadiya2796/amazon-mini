import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import {ControllerBase} from '../interfaces/ControllerBase' // eslint-disable-line
import { CartService } from '../services/CartService'
import { Cart, CartDetail } from '../models' // eslint-disable-line
import { AuthMiddleware } from '../middleware/AuthMiddleware'
import { GrantAccess, SchemaValidate } from '../middleware'
import { addToCart } from '../validation/cartSchema'

export class CartController implements ControllerBase {
  public path = '/carts'
  public router = express.Router()
  public cartService: CartService

  constructor () {
    this.initRoutes()
    this.cartService = new CartService()
  }

  public initRoutes () {
    // this.router.get('/carts', this.getAll)
    this.router.get(`${this.path}`, AuthMiddleware, GrantAccess('carts'), this.getCartDetails)
    this.router.post(this.path, AuthMiddleware, GrantAccess('carts'), SchemaValidate(addToCart), this.post)
    // this.router.put(`${this.path}/:cartId`, AuthMiddleware, GrantAccess('carts'),this.update)
    // this.router.delete(`${this.path}/:cartId`, AuthMiddleware, GrantAccess('carts'), this.delete)
  }

  post = async (req: Request, res: Response) => {
    const cartDetail: CartDetail = req.body
    let cartInfo: Partial<Cart> = {}
    cartInfo.buyerId = res.locals.user.id
    const response = await this.cartService.addToCart(cartDetail, cartInfo)
    if(response.isSuccess){
      ResponseHandler.success(res, response.getValue())
    }else {
      ResponseHandler.fail(res, response.getError())
    }
  }

  getCartDetails = async (req: Request, res: Response) => {
    const { id:userId } = res.locals.user
    const response = await this.cartService.getCartByUserId(userId)
    if (response.isSuccess) {
      ResponseHandler.success(res, response.getValue())
    } else {
      ResponseHandler.fail(res, response.getError())
    }
  }

  // getAll = async (req: Request, res: Response) => {
  //   const filters = req.query
  //   const response = await this.cartService.getCarts(filters)
  //   if (response.isSuccess) {
  //     ResponseHandler.success(res, response.getValue())
  //   } else {
  //     ResponseHandler.fail(res, response.getError())
  //   }
  // }

  // update = async (req: Request, res: Response) => {
  //   const pathParams = req.params
  //   const data: Cart = req.body
  //   const cart = await this.cartService.getCartById(pathParams.cartId)
  //   if (cart.isSuccess) {
  //     const response = await this.cartService.updateCart(pathParams.cartId, data)
  //     if (response.isSuccess) {
  //       ResponseHandler.success(res, response.getValue())
  //     } else {
  //       ResponseHandler.fail(res, response.getError())
  //     }
  //   } else {
  //     ResponseHandler.fail(res, { message: 'Cart not found', code: 404 })
  //   }
  // }

  // delete = async (req: Request, res: Response) => {
  //   const pathParams = req.params
  //   const cart = await this.cartService.getCartById(pathParams.cartId)
  //   if (cart.isSuccess) {
  //     const response = await this.cartService.deleteCart(pathParams.cartId)
  //     if (response.isSuccess) {
  //       ResponseHandler.success(res, response.getValue())
  //     } else {
  //       ResponseHandler.fail(res, response.getError())
  //     }
  //   } else {
  //     ResponseHandler.fail(res, { message: 'Cart not found', code: 404 })
  //   }
  // }
}
