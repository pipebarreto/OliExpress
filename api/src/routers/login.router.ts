import express from 'express'
import passport from 'passport'
import { JWT_SECRET } from '../util/secrets'
import jwt from 'jsonwebtoken'
import checkAuth from '../middlewares/checkAuth'
import { loginWithGoogle } from '../passport/google'
import User from '../models/User'
import bcrypt from 'bcrypt'
import { env } from 'process'

const router = express.Router()
router.use(passport.initialize())
passport.use(loginWithGoogle())

router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user: any = req.user
    const token = jwt.sign(
      {
        id: user._id,
        userId: user.email,
        isAdmin: user.isAdmin,
        name: user.name,
        picture: user.picture,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token })
  }
)

router.post('/login2', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All field are required')
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, email, isAdmin: user.isAdmin },
        JWT_SECRET,
        {
          expiresIn: '1d',
        }
      )
      res.json({ token })
      res.status(200).json(user)
    }
    res.status(400).send('Invalid Credentials')
  } catch (err) {}
})

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All fields required')
    }
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send('Email already exists')
    }
    const encryptedPassword = await bcrypt.hash(password, 10)

    let isAdmin = false
    if (email == env.administrator) {
      isAdmin = true
    }

    const user = await User.create({
      email: email.toLowerCase(),
      isAdmin: isAdmin,
      password: encryptedPassword,
    })

    const token = jwt.sign(
      { id: user._id, email, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )
    res.json({ token })
    res.status(201).json(user)
  } catch (err) {}
})

export default router
