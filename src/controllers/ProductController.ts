import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import {ControllerBase} from '../interfaces/ControllerBase' // eslint-disable-line
import { ProductService } from '../services/ProductService'
import { Product } from '../models' // eslint-disable-line
import { AuthMiddleware } from '../middleware/AuthMiddleware'
import { GrantAccess, SchemaValidate } from '../middleware'
import { createProduct } from '../validation/productSchema'

export class ProductController implements ControllerBase {
  public path = '/products'
  public router = express.Router()
  public productService: ProductService

  constructor () {
    this.initRoutes()
    this.productService = new ProductService()
  }

  public initRoutes () {
    this.router.get(`${this.path}`, AuthMiddleware, GrantAccess('products'), this.getAll)
    this.router.get(`${this.path}/:productId`, AuthMiddleware, GrantAccess('products'), this.getById)
    this.router.post(this.path, AuthMiddleware, GrantAccess('products'), SchemaValidate(createProduct), this.post)
    this.router.put(`${this.path}/:productId`, AuthMiddleware, GrantAccess('products'),this.update)
    this.router.delete(`${this.path}/:productId`, AuthMiddleware, GrantAccess('products'), this.delete)
  }

  post = async (req: Request, res: Response) => {
    const data: Product = req.body as Product
    const authUser = res.locals.user
    data.sellerId = authUser.id
    const response = await this.productService.createProduct(data)
    if(response.isSuccess){
      ResponseHandler.success(res, response.getValue())
    }else {
      ResponseHandler.fail(res, response.getError())
    }
  }

  getById = async (req: Request, res: Response) => {
    const { productId } = req.params
    if (productId) {
      const response = await this.productService.getProductById(productId)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'Bad Request', code: 400 })
    }
  }

  getAll = async (req: Request, res: Response) => {
    const filters = req.query
    const response = await this.productService.getProducts(filters)
    if (response.isSuccess) {
      ResponseHandler.success(res, response.getValue())
    } else {
      ResponseHandler.fail(res, response.getError())
    }
  }

  update = async (req: Request, res: Response) => {
    const pathParams = req.params
    const data: Product = req.body
    const product = await this.productService.getProductById(pathParams.productId)
    if (product.isSuccess) {
      const response = await this.productService.updateProduct(pathParams.productId, data)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'Product not found', code: 404 })
    }
  }

  delete = async (req: Request, res: Response) => {
    const pathParams = req.params
    const product = await this.productService.getProductById(pathParams.productId)
    if (product.isSuccess) {
      const response = await this.productService.deleteProduct(pathParams.productId)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'Product not found', code: 404 })
    }
  }
}
