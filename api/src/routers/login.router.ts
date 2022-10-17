import express from 'express'
import passport from 'passport'
import { JWT_SECRET } from '../util/secrets'
import jwt from 'jsonwebtoken'
import checkAuth from '../middlewares/checkAuth'
import { loginWithGoogle } from '../passport/google'
import User from '../models/User'
import bcrypt from 'bcrypt'

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
        userId: user.email,
        admin: user.isAdmin,
        id: user._id,
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
    console.log(res, req)
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, JWT_SECRET, {
        expiresIn: '1d',
      })

      res.json({ token })
      res.status(200).json(user)
    }
    res.status(400).send('Invalid Credentials')
  } catch (err) {
    console.log(err)
  }
})

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login')
    }
    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    })

    const token = jwt.sign({ user_id: user._id, email }, JWT_SECRET, {
      expiresIn: '1d',
    })
    res.json({ token })
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
  }
})

export default router
