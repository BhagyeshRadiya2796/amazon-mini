import * as express from 'express'  // eslint-disable-line
import { Request, Response } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import {ControllerBase} from '../interfaces/ControllerBase' // eslint-disable-line
import { RoleService } from '../services/RoleService'
import { Role } from '../models' // eslint-disable-line

export class RoleController implements ControllerBase {
  public path = '/role'
  public router = express.Router()
  public roleService: RoleService

  constructor () {
    this.initRoutes()
    this.roleService = new RoleService()
  }

  public initRoutes () {
    // this.router.get('/roles', this.getAll)
    this.router.get(this.path + '/:roleId', this.getById)
    // this.router.post(this.path, this.post)
    this.router.put(this.path + '/:roleId', this.update)
    // this.router.delete(this.path + '/:roleId', this.delete)
  }

  post = async (req: Request, res: Response) => {
    const data: Role = req.body as Role
    if (Object.keys(data).length !== 0) {
      const response = await this.roleService.createRole(data)
      if(response.isSuccess){
        ResponseHandler.success(res, response.getValue())
      }else {
        ResponseHandler.fail(res, response.getError())
      }
    }else {
      ResponseHandler.fail(res, { message: 'Invalid Request body', code: 400})
    }
  }

  getById = async (req: Request, res: Response) => {
    const { roleId } = req.params
    if (roleId) {
      const response = await this.roleService.getRoleById(roleId)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'Bad Request', code: 400 })
    }
  }

  // getAll = async (req: Request, res: Response) => {
  //   const filters = req.query
  //   const response = await this.roleService.getRoles(filters)
  //   if (response.isSuccess) {
  //     ResponseHandler.success(res, response.getValue())
  //   } else {
  //     ResponseHandler.fail(res, response.getError())
  //   }
  // }

  update = async (req: Request, res: Response) => {
    const pathParams = req.params
    const data: Role = req.body
    const role = await this.roleService.getRoleById(pathParams.roleId)
    if (role.isSuccess) {
      const response = await this.roleService.updateRole(pathParams.roleId, data)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'Role not found', code: 404 })
    }
  }

  delete = async (req: Request, res: Response) => {
    const pathParams = req.params
    const role = await this.roleService.getRoleById(pathParams.roleId)
    if (role.isSuccess) {
      const response = await this.roleService.deleteRole(pathParams.roleId)
      if (response.isSuccess) {
        ResponseHandler.success(res, response.getValue())
      } else {
        ResponseHandler.fail(res, response.getError())
      }
    } else {
      ResponseHandler.fail(res, { message: 'Role not found', code: 404 })
    }
  }
}
