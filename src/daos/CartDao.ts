import { Sequelize } from 'sequelize'
import { RepoError, Result } from '../helpers/Result'
import { RepoResult } from '../interfaces/CommonCrud' // eslint-disable-line
import { Cart, CartDetail, Product, User } from '../models'
import { BaseDao } from './BaseDao'
export class CartDao extends BaseDao<Cart> {
  constructor () {
    super(Cart)
  }
  public addToCart = async (cartDetail: CartDetail, cart: Partial<Cart>): RepoResult<any> => {
    try {
      const createdCartId = await this.findOrCreate(cart as Cart)
      cartDetail.cartId = createdCartId
      const [[affectedRows, affectedCounts]] = await CartDetail.increment(
        {
          quantity: cartDetail.quantity
        }, 
        { 
          where:{
            cartId: createdCartId, 
            productId: cartDetail.productId
          }
        },
      )
      if(!affectedCounts){
        await CartDetail.create(cartDetail)
      }
      return Result.ok({ cartId: createdCartId })
    } catch (ex: any) {
      console.log('error', ex)
      return Result.fail(new RepoError(ex.message, 500))
    }
  }
  findOrCreate = async (cart: Cart) => {
    const [createdCart, isCreated] = await Cart.findOrCreate({
      where: {
        buyerId: cart.buyerId
      },
      defaults: cart
    })
    return createdCart && createdCart.id
  }

  public getCartDetailByUserId = async (userId) => {
    try {
      const cartDetail: any = await Cart.findAll({
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
      if (!cartDetail) {
        return Result.fail(new RepoError('No data found', 404))
      }else {
        const responseData = cartDetail[0].toJSON()
        responseData.Products = responseData.Products.map((product) => {
          let finalObj = Object.assign({}, product.CartDetail)
          delete product.CartDetail
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
