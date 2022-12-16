import { UserDao } from "../daos/UserDao"
import { comparePasswords } from "../helpers/constants"
import { createToken } from "../helpers/jwtHelper"
import { RepoError, Result } from "../helpers/Result"
import { User } from "../models"

export class AuthService {
  private userDao: UserDao
  constructor () {
    this.userDao = new UserDao()
  }

  loginUser = async (requestUser : User, roleName) => {
    const response = await this.userDao.isUserWithRole(requestUser.email, roleName)
    if (response.isFailure) {
      return Result.fail(new RepoError('Invalid credential Details', 400))
    }
    let user: any = response.getValue()
    const isMatch = comparePasswords(user.password, requestUser.password)
    if (isMatch) {
        const tokenUserObj = {
            id: user.id, 
            email: user.email, 
            firstName: user.firstName, 
            lastName: user.lastName,
            permissions: user.roles[0].Permissions.map(permission => permission.name)
        }
        console.log('tokenuser', tokenUserObj)
        const token = createToken(tokenUserObj)
        return Result.ok({token})
    } else {
      return Result.fail(new RepoError('Invalid credential Details', 400))
    }
  }
}
