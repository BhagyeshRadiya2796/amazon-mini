import express from 'express'
import * as bodyParser from 'body-parser'
import { Application } from 'express'

export class App {
  public app: Application
  public port: any

  constructor(appInit: { port: any; controllers: any; }) {
    this.app = express()
    this.port = appInit.port
    this.app.use(bodyParser.urlencoded({extended:true}))
    this.app.use(bodyParser.json())
    this.routes(appInit.controllers)

  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}
