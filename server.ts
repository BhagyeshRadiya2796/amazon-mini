import { App } from './app'
import { UserController } from './src/controllers/UserController'
import { sequelize } from './src/config/connection';
import { RoleController } from './src/controllers/RoleController';
import { AuthController } from './src/controllers/AuthController';
import { ProductController } from './src/controllers/ProductController';
import { SERVER_PORT } from './src/helpers/constants'

const app = new App({
  port: SERVER_PORT || 3000,
  controllers: [
    new UserController(),
    new RoleController(),
    new AuthController(),
    new ProductController()
  ]
})
sequelize
  .sync()
  .then((res)=> console.log("All models were synchronized successfully."))
  .catch(er => console.log('Error while synchtronizing the models: ', er))
app.listen()
