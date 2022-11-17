
import { RepoError, Result } from '../helpers/Result'
import { RepoResult } from '../interfaces/CommonCrud' // eslint-disable-line
import { Role } from '../models'
import { BaseDao } from './BaseDao'
export class RoleDao extends BaseDao<Role> {
  constructor () {
    super(Role)
  }
}
