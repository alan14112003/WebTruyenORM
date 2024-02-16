import { DataTypes } from 'sequelize'
import SequelizeConfig from '@/config/Sequelize.config'

const Comment = SequelizeConfig.define('Comment', {
  content: {
    type: DataTypes.STRING(1000),
  },
  type: {
    type: DataTypes.TINYINT,
  },
})

export default Comment
