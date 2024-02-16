import SequelizeConfig from '@/config/Sequelize.config'

const FollowUser = SequelizeConfig.define(
  'FollowUser',
  {},
  {
    timestamps: false,
  }
)

export default FollowUser
