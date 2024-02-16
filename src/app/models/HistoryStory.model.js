import SequelizeConfig from '@/config/Sequelize.config'

const HistoryStory = SequelizeConfig.define(
  'HistoryStory',
  {},
  {
    timestamps: false,
  }
)

export default HistoryStory
