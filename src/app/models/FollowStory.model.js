import SequelizeConfig from '@/config/Sequelize.config'

const FollowStory = SequelizeConfig.define(
  'FollowStory',
  {},
  {
    timestamps: false,
  }
)

export default FollowStory
