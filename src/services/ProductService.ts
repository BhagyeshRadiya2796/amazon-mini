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

  public getProducts = async (filters) => {
    let { name, limit, skip } = filters
    limit = limit ? parseInt(limit) : null
    skip = skip ? parseInt(skip) : null

    let whereCondition = {}
    if (name) {
      const condition = {
        name: {
          [Op.like]: `%${name}%`
        }
      }
      whereCondition = { ...whereCondition, ...condition }
    }
    const response = await this.productDao.find(
      {
        where: whereCondition,
        attributes: ['id', 'name', 'description', 'quantity', 'price'],
        limit,
        offset: skip
      } as QueryParams
    )
    return response
  }

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
