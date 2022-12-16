import { ControllerBase } from '../interfaces/ControllerBase' // eslint-disable-line
import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import { User } from './../models' // eslint-disable-line
import { UserService } from '../services/UserService'
import { AuthService } from '../services/AuthService'
import { createUser, loginUser } from '../validation/UserSchema'
import { SchemaValidate } from '../middleware'

export class AuthController implements ControllerBase {
    public path = '/auth'
    public router = express.Router()
    public userService: UserService
    public authService: AuthService

    constructor () {
      this.initRoutes()
      this.userService = new UserService()
      this.authService = new AuthService()
    }

    public initRoutes () {
      this.router.post(`${this.path}/login`, SchemaValidate(loginUser), this.login)
      this.router.post(`${this.path}/signup`, SchemaValidate(createUser), this.signUp)
    }

    login = async (req: Request, res: Response) => {
      const requestUser: User = req.body
      const { role } = req.query
      const result = await this.authService.loginUser(requestUser, role)
      if (result.isSuccess) {
        return ResponseHandler.success(res, result.getValue())
      } else {
        ResponseHandler.fail(res, result.getError())
      }
    }

    signUp = async (req: Request, res: Response) => {
      const user: User = req.body as User
      const { role } = req.query
      const response = await this.userService.createUser(user, role)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    }
}
