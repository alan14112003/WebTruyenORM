import AuthKeyEnum from '@/app/enums/redis_key/AuthKey.enum'
import Role from '@/app/models/Role.model'
import User from '@/app/models/User.model'
import AuthUtil from '@/app/utils/Auth.util'
import JwtConfig from '@/config/Jwt.config'
import RedisConfig from '@/config/Redis.config'

const AuthMiddleware = {
  checkAuth: async (req, res, next) => {
    const authorization = req.headers.authorization
    try {
      if (!authorization) return res.status(401).json('un authorization')

      const [scheme, token] = authorization.split(' ')
      if (scheme !== 'Bearer') return res.status(401).json('un authorization')
      if (!token) return res.status(401).json('un authorization')

      const payload = JwtConfig.verifyToken(token)
      const redisKey = `${AuthKeyEnum.ID}.${payload.id}`

      let auth = await RedisConfig.get(redisKey)

      if (!auth) {
        auth = await AuthUtil.findAuthWithRole({
          id: payload.id,
        })
      }

      if (!auth) {
        return res.status(401).json('un authorization')
      }

      RedisConfig.set(redisKey, auth)

      const checkAllowedAuth = AuthUtil.checkAllowed(auth)
      if (!checkAllowedAuth.status) {
        return res.status(401).json(checkAllowedAuth.message)
      }

      req.user = auth
      next()
    } catch (error) {
      if (error.message == 'jwt expired') {
        return res.status(401).json('token expired')
      }
      console.log('error', error)
      next(error)
    }
  },

  checkPermission: (permissionCode) => {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json('user is not exist')
        }

        const user = req.user
        if (!user.Role.permissions) {
          return res.status(403).json('permissions is not exist')
        }

        if (!user.Role.permissions.includes(permissionCode)) {
          return res.status(403).json('access denied')
        }
        next()
      } catch (error) {
        next(error)
      }
    }
  },
}

export default AuthMiddleware
