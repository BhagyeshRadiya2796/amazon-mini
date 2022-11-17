import { Op } from 'sequelize'
import { ProductDao } from '../daos/ProductDao'
import { QueryParams } from '../interfaces/QueryParams' // eslint-disable-line
import {Product} from '../models' // eslint-disable-line

export class ProductService {
  private productDao: ProductDao
  constructor () {
    this.productDao = new ProductDao()
  }

  public createProduct = async (product: Product) => {
    const newProduct = await this.productDao.create(product)
    return newProduct
  }

//   public getProducts = async (filters) => {
//     let { firstName, lastName, phone, email, limit, skip } = filters
//     limit = limit ? parseInt(limit) : null
//     skip = skip ? parseInt(skip) : null

//     let whereCondition = {}
//     if (firstName) {
//       const condition = {
//         firstName: {
//           [Op.like]: `%${firstName}%`
//         }
//       }
//       whereCondition = { ...whereCondition, ...condition }
//     }
//     if (lastName) {
//       const condition = {
//         lastName: {
//           [Op.like]: `%${lastName}%`
//         }
//       }
//       whereCondition = { ...whereCondition, ...condition }
//     }
//     if (email) {
//       whereCondition = { ...whereCondition, email }
//     }
//     if (phone) {
//       whereCondition = { ...whereCondition, phone }
//     }
//     const response = await this.productDao.find(
//       {
//         where: whereCondition,
//         attributes: ['firstName', 'lastName', 'email', 'id', 'phone'],
//         limit,
//         offset: skip
//       } as QueryParams
//     )
//     return response
//   }

  public deleteProduct = async (productId: string) => {
    const response = await this.productDao.delete(productId)
    return response
  }

  public getProductById = async (productId: string) => {
    const response = await this.productDao.findOne(productId)
    return response
  }

  public updateProduct = async (productId: string, newProduct) => {
    const product = await this.productDao.update(productId, newProduct)
    return product || null
  }
}
