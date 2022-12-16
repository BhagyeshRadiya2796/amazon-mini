import { Op } from 'sequelize'
import { CartDao } from '../daos/CartDao'
import { ProductDao } from '../daos/ProductDao'
import { QueryParams } from '../interfaces/QueryParams' // eslint-disable-line
import {Cart, CartDetail} from '../models' // eslint-disable-line

export class CartService {
  private cartDao: CartDao
  private productDao: ProductDao
  constructor () {
    this.cartDao = new CartDao()
    this.productDao = new ProductDao()
  }

  public addToCart = async (cartDetail: CartDetail, cart: Partial<Cart>) => {
    const product: any = await this.productDao.findOne(cartDetail.productId)
    if(product.isSuccess){
      cartDetail.price = product.getValue()?.price
      const newCart = await this.cartDao.addToCart(cartDetail, cart)
      return newCart
    }
    return product
  }

  public deleteCart = async (cartId: string) => {
    const response = await this.cartDao.delete(cartId)
    return response
  }

  public getCartByUserId = async (userId: string) => {
    const response = await this.cartDao.getCartDetailByUserId(userId)
    return response
  }

  public updateCart = async (cartId: string, newCart) => {
    const cart = await this.cartDao.update(cartId, newCart)
    return cart || null
  }
}
