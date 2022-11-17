import { JwtPayload } from 'jsonwebtoken' // eslint-disable-line
import { Request, Response, NextFunction } from 'express' // eslint-disable-line
import { ResponseHandler } from '../helpers/ResponseHandler'
import { ERROR_MESSAGES } from '../helpers/constants'
import * as status from 'http-status'
import { verifyToken } from '../helpers/jwtHelper'

interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      throw new Error()
    }

    (req as CustomRequest).token = verifyToken(token)

    next()
  } catch (err) {
    console.log('error', err)
    ResponseHandler.fail(res, { code: status.UNAUTHORIZED, message: ERROR_MESSAGES.UN_AUTHORIZED })
  }
}
