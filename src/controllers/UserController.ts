import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import {ControllerBase} from '../interfaces/ControllerBase' // eslint-disable-line
import { UserService } from '../services/UserService'
import { User } from '../models' // eslint-disable-line
import { Authenticate, GrantAccess } from '../middleware'

export class UserController implements ControllerBase {
  public path = '/users'
  public router = express.Router()
  public userService: UserService

  constructor () {
    this.initRoutes()
    this.userService = new UserService()
  }

  public initRoutes () {
    GrantAccess
    this.router.get(`${this.path}`, Authenticate, GrantAccess('users'), this.getAll)
    this.router.get(`${this.path}/:userId`, Authenticate, GrantAccess('users'), this.getById)
    this.router.put(`${this.path}/:userId`, Authenticate, GrantAccess('users'), this.update)
    this.router.delete(`${this.path}/:userId`, Authenticate, GrantAccess('users'), this.delete)
    this.router.get(`/test`, this.test)
  }

  getById = async (req: Request, res: Response) => {
    const { userId } = req.params
    if (userId) {
      const response = await this.userService.getUserById(userId)
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
    const response = await this.userService.getUsers(filters)
    if (response.isSuccess) {
      ResponseHandler.success(res, response.getValue())
    } else {
      ResponseHandler.fail(res, response.getError())
    }
  }

  update = async (req: Request, res: Response) => {
    const pathParams = req.params
    const data: User = req.body
    const user = await this.userService.getUserById(pathParams.userId)
    if (user.isSuccess) {
      const response = await this.userService.updateUser(pathParams.userId, data)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'User not found', code: 404 })
    }
  }

  delete = async (req: Request, res: Response) => {
    const pathParams = req.params
    const user = await this.userService.getUserById(pathParams.userId)
    if (user.isSuccess) {
      const response = await this.userService.deleteUser(pathParams.userId)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'User not found', code: 404 })
    }
  }

  test = async (req: Request, res: Response) => {
    const filters = req.query
    const response = await this.userService.test()
    if (response.isSuccess) {
      ResponseHandler.success(res, response.getValue())
    } else {
      ResponseHandler.fail(res, response.getError())
    }
  }
}
