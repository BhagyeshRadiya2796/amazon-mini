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
}
