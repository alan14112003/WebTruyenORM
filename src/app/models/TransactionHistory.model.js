import { DataTypes } from 'sequelize'
import SequelizeConfig from '@/config/Sequelize.config'

const TransactionHistory = SequelizeConfig.define(
  'TransactionHistory',
  {
    type: {
      type: DataTypes.TINYINT,
    },
    money: {
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.STRING(6),
    },
    check: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    updatedAt: false,
  }
)

export default TransactionHistory
