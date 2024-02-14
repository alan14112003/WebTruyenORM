// role.js
import SequelizeConfig from '@/config/Sequelize.config'
import { DataTypes } from 'sequelize'

const Role = SequelizeConfig.define(
  'Role',
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    permissions: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
)

export default Role
