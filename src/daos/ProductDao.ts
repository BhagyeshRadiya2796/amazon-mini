
import { RepoError, Result } from '../helpers/Result'
import { RepoResult } from '../interfaces/CommonCrud' // eslint-disable-line
import { Product } from '../models'
import { BaseDao } from './BaseDao'
export class ProductDao extends BaseDao<Product> {
  constructor () {
    super(Product)
  }
}
