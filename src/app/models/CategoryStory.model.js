import SequelizeConfig from '@/config/Sequelize.config'

const CategoryStory = SequelizeConfig.define(
  'CategoryStory',
  {},
  {
    timestamps: false,
  }
)

export default CategoryStory
