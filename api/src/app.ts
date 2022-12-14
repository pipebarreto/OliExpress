import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import productRouter from './routers/product.router'
import orderRouter from './routers/order.router'
import passport from 'passport'
import { loginWithGoogle } from './passport/google'
import checkAuth from './middlewares/checkAuth'
import userRouter from './routers/user.router'
import loginRouter from './routers/login.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.session())
*/

app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers

app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', checkAuth, orderRouter)
app.use('/api/v1/users', checkAuth, userRouter)
app.use('/api/v1/', loginRouter)

app.use(apiErrorHandler)

export default app
