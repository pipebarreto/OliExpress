import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { UserDocument } from '../models/User'

import { ForbiddenError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]

      const decodedUser = jwt.verify(token, JWT_SECRET)

      const admin = Object.values(decodedUser)[2]

      console.log(decodedUser)

      if (!admin) {
        throw new ForbiddenError()
      }

      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    throw new ForbiddenError()
  }
}
