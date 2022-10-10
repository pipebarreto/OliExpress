import GoogleTokenStrategy from 'passport-google-id-token'
import { GOOGLE_CLIENT_ID } from '../util/secrets'
import User from '../models/User'

interface ParsedToken {
  payload: {
    email: string
    email_verified: string
    name: string
    picture: string
    given_name: string
    family_name: string
    locale: string
  }
}

interface VerifiedCallback {
  (error: any, user?: any, info?: any): void
}

export function loginWithGoogle() {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        console.log('googleId:', googleId)
        console.log('parsedToken:', parsedToken)

        let user: any = await User.findOne({
          email: parsedToken.payload.email,
        })
        if (!user) {
          user = new User({
            email: parsedToken.payload.email,
            name: parsedToken.payload.name,
            picture: parsedToken.payload.picture,
            isAdmin: false,
          })
          user.save()
        }

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}
