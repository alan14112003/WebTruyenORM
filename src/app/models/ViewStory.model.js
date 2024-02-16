import SequelizeConfig from '@/config/Sequelize.config'

const ViewStory = SequelizeConfig.define(
  'ViewStory',
  {},
  {
    timestamps: false,
  }
)

export default ViewStory
