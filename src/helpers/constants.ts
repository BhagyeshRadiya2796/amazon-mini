import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv';
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })
export const DB_CONNECTION_DETAIL = {
  DB_USER: 'root',
  DB_PASSWORD: 'root',
  DB_HOST: 'localhost',
  DB_DRIVER: 'mysql',
  DB_NAME: 'flipcart'
}

export const JWT_SECRATE = process.env.JWT_SECRATE || 'temp'
console.log('process.env.JWT_SECRATE', process.env.JWT_SECRATE)
const SALT_ROUND = 10

export const ERROR_MESSAGES = {
  UN_AUTHORIZED: 'Unauthorized Access'
}

export const comparePasswords = (userPassword, reqPassword) => bcrypt.compareSync(reqPassword, userPassword)

export const createPasswordHash = async (password) => await bcrypt.hash(password, SALT_ROUND)

export const TABLE_NAMES = {
  USER: 'users',
  ROLE:'roles',
  PERMISSIONS: 'permissions',
  USER_ROLES: 'user_roles',
  ROLE_PERMISSIONS: 'role_permissions',
  PRODUCT: 'products',
  CART: 'carts',
  CART_DETAIL:'cart_details',
  ORDER: 'orders',
  ORDER_DETAIL:'order_details'
}

export enum ORDER_STATUS {
  PLACED,
  CONFIRMED,
  SHIPPED,
  DELIVERED,
  CANCELLED
}
export const ORDER_STATUS_ARRAY = [
  'PLACED',
  'CONFIRMED',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED'
]
export const SERVER_PORT = process.env.PORT