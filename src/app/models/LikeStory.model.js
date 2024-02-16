import SequelizeConfig from '@/config/Sequelize.config'

const LikeStory = SequelizeConfig.define(
  'LikeStory',
  {},
  {
    timestamps: false,
  }
)

export default LikeStory
