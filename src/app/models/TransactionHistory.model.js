import { DataTypes } from 'sequelize'
import SequelizeConfig from '@/config/Sequelize.config'

const TransactionHistory = SequelizeConfig.define(
  'TransactionHistory',
  {
    type: {
      type: DataTypes.TINYINT,
    },
    money: {
      type: DataTypes.STRING,
    },
  },
  {
    updatedAt: false,
  }
)

export default TransactionHistory
