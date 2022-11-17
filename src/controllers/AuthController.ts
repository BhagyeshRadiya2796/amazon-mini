import { ControllerBase } from '../interfaces/ControllerBase' // eslint-disable-line
import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import { User } from './../models' // eslint-disable-line
import { UserService } from '../services/UserService'
import { comparePasswords } from '../helpers/constants'
import { createToken } from '../helpers/jwtHelper'
import { AuthService } from '../services/AuthService'

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
      this.router.post(`${this.path}/login`, this.login)
      this.router.post(`${this.path}/signup`, this.signUp)
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
      if (Object.keys(user).length !== 0) {
        const response = await this.userService.createUser(user, role)
        if (response.isSuccess) {
          ResponseHandler.success(res, response.getValue())
        } else {
          ResponseHandler.fail(res, response.getError())
        }
      } else {
        ResponseHandler.fail(res, { message: 'Invalid Request body', code: 400 })
      }
    }
}
