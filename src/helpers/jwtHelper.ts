import jwt from 'jsonwebtoken'
import User from './../models/User' // eslint-disable-line
import { JWT_SECRATE } from './constants'

export const createToken = (data: Partial<User>) => {
  const token = jwt.sign(data, JWT_SECRATE, {
    expiresIn: '2 days'
  })
  return token
}

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRATE)
  console.log('token', decoded)
  return decoded
}
