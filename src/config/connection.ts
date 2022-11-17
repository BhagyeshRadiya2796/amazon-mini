import { Dialect, Sequelize } from 'sequelize' // eslint-disable-line
import { DB_CONNECTION_DETAIL } from '../helpers/constants'
const dbName = DB_CONNECTION_DETAIL.DB_NAME as string
const dbUser = DB_CONNECTION_DETAIL.DB_USER as string
const dbHost = DB_CONNECTION_DETAIL.DB_HOST
const dbDriver = DB_CONNECTION_DETAIL.DB_DRIVER as Dialect
const dbPassword = DB_CONNECTION_DETAIL.DB_PASSWORD

const sequelize: Sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})

export { Sequelize, sequelize }
