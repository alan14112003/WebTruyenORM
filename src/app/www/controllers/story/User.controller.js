import UserKeyEnum from '@/app/enums/redis_key/UserKey.enum'
import User from '@/app/models/User.model'
import UserUtil from '@/app/utils/User.util'
import RedisConfig from '@/config/Redis.config'

const UserController = {
  all: async (req, res, next) => {
    try {
      let users = await RedisConfig.get(UserKeyEnum.ALL)

      if (!users) {
        users = await User.findAll({
          attributes: UserUtil.getPublicInfoAttribute(),
        })
      }

      RedisConfig.set(UserKeyEnum.ALL, users)

      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  },
}

export default UserController
