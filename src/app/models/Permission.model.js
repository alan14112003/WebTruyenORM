import { DataTypes } from 'sequelize'
import SequelizeConfig from '@/config/Sequelize.config'

const Permission = SequelizeConfig.define(
  'Permission',
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
    },
  },
  {
    timestamps: false, // Tắt tự động thêm timestamps
  }
)

export default Permission
