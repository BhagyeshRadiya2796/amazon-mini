import { Response } from 'express' // eslint-disable-line

export class ResponseHandler {
  public static success (res: Response, result: any) {
    return res.status(200).json({
      data: result
    })
  }

  public static fail (res: Response, detail: any) {
    return res.status(detail.code).json({
      statusCode: detail.code,
      errorMessage: detail.message
    })
  }
  public static validationErrors (res: Response, errors: []) {
    return res.status(400).json({
      statusCode: 400,
      errorMessages: errors
    })
  }
}
