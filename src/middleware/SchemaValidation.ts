import { ResponseHandler } from "../helpers/ResponseHandler";
import { Request, Response, NextFunction } from 'express' // eslint-disable-line
import Joi, { ObjectSchema, Schema } from "joi";

export const SchemaValidate = (schema: Schema ) => {
    return (req: Request, res: Response, next: Function) => {
        const user: any = req.body;
        const resposne = schema.validate(user, { abortEarly: false })
        const errors: [] | null =  validationResponse(resposne)
        if(errors){
           ResponseHandler.validationErrors(res, errors)
        }else{
            next();
        }
    }
}
const validationResponse = (result) => {
    if(result && result.error && result.error.details && result.error.details.length > 0){
        const errorMessages = result.error.details.map(error => {
            const message = error.message
            const errorObj = { detail: message.replace(/['"]+/g, '')}
            return errorObj
        })
        return errorMessages
    }
    return null
}