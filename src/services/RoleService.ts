import { Op } from 'sequelize'
import { RoleDao } from '../daos/RoleDao'
import { QueryParams } from '../interfaces/QueryParams' // eslint-disable-line
import {Role} from '../models' // eslint-disable-line

export class RoleService {
  private roleDao: RoleDao
  constructor () {
    this.roleDao = new RoleDao()
  }

  public createRole = async (role: Role) => {
    const newRole = await this.roleDao.create(role)
    return newRole
  }

//   public getRoles = async (filters) => {
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
//     const response = await this.roleDao.find(
//       {
//         where: whereCondition,
//         attributes: ['firstName', 'lastName', 'email', 'id', 'phone'],
//         limit,
//         offset: skip
//       } as QueryParams
//     )
//     return response
//   }

  public deleteRole = async (roleId: string) => {
    const response = await this.roleDao.delete(roleId)
    return response
  }

  public getRoleById = async (roleId: string) => {
    const response = await this.roleDao.findOne(roleId)
    return response
  }

  public updateRole = async (roleId: string, newRole) => {
    const role = await this.roleDao.update(roleId, newRole)
    return role || null
  }
}
