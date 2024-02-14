import { Op } from 'sequelize'
import UserGenderEnum from '@/app/enums/users/UserGender.enum'
import UserRoleEnum from '@/app/enums/users/UserRole.enum'
import User from '@/app/models/User.model'
import AuthUtil from '@/app/utils/Auth.util'
import BcryptConfig from '@/config/Bcrypt.config'
import GoogleOauth2Config from '@/config/GoogleOauth2.config'
import JwtConfig from '@/config/Jwt.config'
import SequelizeConfig from '@/config/Sequelize.config'

const REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP

const AuthController = {
  login: async (req, res, next) => {
    const body = req.body

    try {
      const auth = await User.findOne({
        where: {
          email: body.email,
        },
        paranoid: false,
      })

      if (!auth) {
        return res.status(401).json('invalid email or password')
      }

      if (!BcryptConfig.comparePass(body.password, auth.password)) {
        return res.status(401).json('invalid email or password')
      }

      const checkAllowedAuth = AuthUtil.checkAllowed(auth)
      if (!checkAllowedAuth.status) {
        return res.status(401).json(checkAllowedAuth.message)
      }

      const authResult = AuthUtil.getAuthResult(auth)

      const token = AuthUtil.generateToken(authResult)
      authResult.accessToken = token.accessToken

      res.cookie('refreshToken', token.refreshToken, {
        maxAge: REFRESH_TOKEN_EXP,
      })
      return res.status(200).json(authResult)
    } catch (error) {
      trx.rollback()
      next(error)
    }
  },

  loginWithGoogle: async (req, res, next) => {
    const body = req.body

    const trx = await SequelizeConfig.transaction()
    try {
      const payload = await GoogleOauth2Config.verify(body.token)

      let auth = await User.findOne({
        where: {
          email: payload.email,
        },
        paranoid: false,
      })

      if (!auth) {
        const avatar = await AuthUtil.uploadAvatar(payload.picture)

        const userDTO = {
          firstName: payload.given_name,
          lastName: payload.family_name,
          email: payload.email,
          password: BcryptConfig.hashPass('123'),
          gender: UserGenderEnum.SECRET,
          status: true,
          roleCode: UserRoleEnum.USER,
          avatar: avatar,
        }

        auth = await User.create(userDTO, {
          transaction: trx,
        })
      }

      const checkAllowedAuth = AuthUtil.checkAllowed(auth)
      if (!checkAllowedAuth.status) {
        return res.status(401).json(checkAllowedAuth.message)
      }

      const authResult = AuthUtil.getAuthResult(auth)

      const token = AuthUtil.generateToken(authResult)
      authResult.accessToken = token.accessToken

      trx.commit()
      res.cookie('refreshToken', token.refreshToken, {
        maxAge: REFRESH_TOKEN_EXP,
      })

      return res.status(200).json(authResult)
    } catch (error) {
      console.log('error', error)
      trx.rollback()
      next(error)
    }
  },

  register: async (req, res, next) => {
    const body = req.body
    body.roleCode = UserRoleEnum.USER

    const trx = await SequelizeConfig.transaction()
    try {
      const userExist = await User.findOne({
        where: {
          email: body.email,
        },
        paranoid: false,
      })

      if (userExist) {
        return res.status(409).json('the account by email is exist')
      }

      body.password = BcryptConfig.hashPass(body.password)

      const auth = await User.create(body, {
        transaction: trx,
      })

      const authResult = AuthUtil.getAuthResult(auth)

      const activeMailToken = JwtConfig.createToken(authResult, '1h')
      AuthUtil.sendActiveMail(authResult, activeMailToken)

      trx.commit()
      return res.status(201).json(authResult)
    } catch (error) {
      trx.rollback()
      next(error)
    }
  },

  activeEmail: async (req, res, next) => {
    const { token } = req.query

    try {
      const payload = JwtConfig.verifyToken(token)
      const auth = await User.findByPk(payload.id)

      if (!auth) {
        return res.status(401).send('account is blocked')
      }

      if (!auth.status) {
        auth.status = true
        await auth.save()
      }

      return res.status(200).send('email has been activated')
    } catch (error) {
      if (error.message == 'jwt expired') {
        return res.status(401).json('token expired')
      }
      next(error)
    }
  },

  requestResetPassword: async (req, res, next) => {
    const body = req.body
    try {
      const user = await User.findOne({
        where: {
          email: body.email,
        },
        paranoid: false,
      })

      if (!user) {
        return res.status(401).json('account by email is not exist')
      }

      const resetCode = Math.floor(100000 + Math.random() * 900000)
      user.resetPassword = resetCode
      await user.save()

      AuthUtil.sendResetPasswordMail(AuthUtil.getAuthResult(user), resetCode)

      return res.status(200).send('check your email to get code please')
    } catch (error) {
      next(error)
    }
  },

  handleResetPassword: async (req, res, next) => {
    const { email, newPassword, code } = req.body
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
        paranoid: false,
      })

      if (!user) {
        return res.status(401).json('account by email is not exist')
      }

      if (code !== user.resetPassword) {
        return res.status(400).json('code not match')
      }

      await User.update(
        {
          resetPassword: null,
          password: BcryptConfig.hashPass(newPassword),
        },
        {
          where: {
            id: user.id,
          },
        }
      )

      return res.status(200).send('success')
    } catch (error) {
      next(error)
    }
  },

  changePassword: async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    try {
      const user = req.user

      if (!BcryptConfig.comparePass(oldPassword, user.password)) {
        return res.status(400).json('old password not match')
      }

      await User.update(
        {
          password: BcryptConfig.hashPass(newPassword),
        },
        {
          where: {
            id: user.id,
          },
        }
      )

      return res.status(200).send('success')
    } catch (error) {
      next(error)
    }
  },

  changeInfo: async (req, res, next) => {
    const body = req.body
    const user = req.user

    try {
      if (body.email) {
        const userExist = await User.findOne({
          where: {
            email: {
              [Op.ne]: user.email,
              [Op.eq]: body.email,
            },
          },
          paranoid: false,
        })

        if (userExist) {
          return res.status(409).send('the account by email is exist')
        }
      }

      await User.update(body, {
        where: {
          id: user.id,
        },
      })

      return res.status(200).send('success')
    } catch (error) {
      next(error)
    }
  },
}

export default AuthController
