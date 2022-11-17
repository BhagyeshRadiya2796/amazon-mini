
import { RepoError, Result } from '../helpers/Result'
import { RepoResult } from '../interfaces/CommonCrud' // eslint-disable-line
import { Permission, Role, User, UserRole } from '../models'
import { BaseDao } from './BaseDao'
export class UserDao extends BaseDao<User> {
  constructor () {
    super(User)
  }

  async createWithRole (user: User, roleName: string, existUser?: any): RepoResult<User> {
    try {
      let response: any = null
      const role = await Role.findOne({
        where: {
          name: roleName
        }
      })
      if(role){
        let userId = ''
        if(!existUser){
          response = await User.create(user)
          response = response.dataValues
          userId = response.id
        }else{
          userId = existUser.id
          response = existUser
        }
        await UserRole.create({
          userId: userId,
          roleId:role.id, 
          createdAt: new Date(), 
          updatedAt: new Date()
        })
        response = {...response, roles:[roleName] }
      }
      return Result.ok(response)
    } catch (ex: any) {
      console.log(ex)
      return Result.fail(new RepoError(ex.message, 500))
    }
  }

  async findByEmail (email): RepoResult<{}> {
    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return Result.fail(new RepoError('User Not found', 404))
      }

      return Result.ok(user.toJSON())
    } catch (ex: any) {
      return Result.fail(new RepoError(ex.message, 500))
    }
  }
  async isUserWithRole(email, roleName): RepoResult<{}> {
    try {
      const user: any = await User.findOne({
        where: {
          email
        },
        include: [
          {
            model: Role,
            attributes: ['name'],
            where:{
              name: roleName
            },
            through:{
              attributes: []
            },
            include:[{
              model: Permission,
              attributes: ['name'],
              through:{
                attributes: []
              }
            }]
          }
        ]
      })
      if (!user) {
        return Result.fail(new RepoError('User does not exist', 400))
      }else {
        return Result.ok(user.toJSON())
      }
    } catch (ex: any) {
      return Result.fail(new RepoError(ex.message, 500))
    }
  } 
  async test (): RepoResult<any> {
    try {
      const user: any = await User.findAll({
        where: {
          email: 'jack@gmail.com'
        },
        include: [
          {
            model: Role,
            where: {
              name: 'admin'
            },
            through: {
              attributes: []
            }
          }
        ]
      })

      if (!user) {
        return Result.fail(new RepoError('User Not found', 404))
      }
      console.log(JSON.stringify(user));
      
      return Result.ok([''])
    } catch (ex: any) {
      console.log('error', ex)
      return Result.fail(new RepoError(ex.message, 500))
    }
  } 
}
