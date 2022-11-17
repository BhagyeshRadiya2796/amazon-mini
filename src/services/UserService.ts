import { Op } from 'sequelize'
import { UserDao } from '../daos/UserDao'
import { createPasswordHash } from '../helpers/constants'
import { RepoError, Result } from '../helpers/Result'
import { RepoResult } from '../interfaces/CommonCrud'
import { QueryParams } from '../interfaces/QueryParams' // eslint-disable-line
import User from '../models/User' // eslint-disable-line

export class UserService {
  private userDao: UserDao
  constructor () {
    this.userDao = new UserDao()
  }

  public createUser = async (user: User, roleName) => {
    const isUserWithRole = await this.userDao.isUserWithRole(user.email, roleName)
    if(isUserWithRole.isFailure){
      user.password = await createPasswordHash(user.password)
      const existUser = await this.userDao.findByEmail(user.email);
      let newUser: any
      if(existUser.isSuccess){
        newUser = await this.userDao.createWithRole(user, roleName, existUser.getValue())
      }else {
        newUser = await this.userDao.createWithRole(user, roleName)
      }
      return newUser
    }else {
      return Result.fail(new RepoError(`${user.email} already exists with ${roleName} - Role`, 400))
    }
  }

  public getUsers = async (filters) => {
    let { firstName, lastName, phone, email, limit, skip } = filters
    limit = limit ? parseInt(limit) : null
    skip = skip ? parseInt(skip) : null

    let whereCondition = {}
    if (firstName) {
      const condition = {
        firstName: {
          [Op.like]: `%${firstName}%`
        }
      }
      whereCondition = { ...whereCondition, ...condition }
    }
    if (lastName) {
      const condition = {
        lastName: {
          [Op.like]: `%${lastName}%`
        }
      }
      whereCondition = { ...whereCondition, ...condition }
    }
    if (email) {
      whereCondition = { ...whereCondition, email }
    }
    if (phone) {
      whereCondition = { ...whereCondition, phone }
    }
    const response = await this.userDao.find(
      {
        where: whereCondition,
        attributes: ['firstName', 'lastName', 'email', 'id', 'phone'],
        limit,
        offset: skip
      } as QueryParams
    )
    return response
  }

  public deleteUser = async (userId: string) => {
    const response = await this.userDao.delete(userId)
    return response
  }

  public getUserById = async (userId: string) => {
    const response = await this.userDao.findOne(userId)
    return response
  }

  public updateUser = async (userId: string, newUser) => {
    const user = await this.userDao.update(userId, newUser)
    return user || null
  }

  public checkUserExist = async(email: string, roleName: string ) => {
    // const user = await this.userDao.findByEmailAndRole()
  }

  public test = async () => {
    const response = await this.userDao.test()
    return response
  }
}
