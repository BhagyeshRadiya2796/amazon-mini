import { ResponseHandler } from "../helpers/ResponseHandler";
import { Request, Response, NextFunction } from 'express' // eslint-disable-line

export const PermissionMiddleware = (access: string) => {
    return (req: Request, res: Response, next: Function) => {
        const user: any = req['token'];
        const permissions = user.permissions;
        if(req.method === 'GET') {
            if(!permissions.some(permission => (permission === `view_${access}`) || (permission === `edit_${access}`))) {
                return ResponseHandler.fail(res, { message: 'Unauthorized access', code: 401})
            }
        } else {
            if(!permissions.some(permission => permission === `edit_${access}`)) {
                return ResponseHandler.fail(res, { message: 'Unauthorized access', code: 401})
            }
        }

        next();
    }
}