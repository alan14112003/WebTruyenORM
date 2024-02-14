// permission.js
import { DataTypes } from 'sequelize'
import SequelizeConfig from '@/config/Sequelize.config'

const Author = SequelizeConfig.define(
  'Author',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false, // Tắt tự động thêm timestamps
  }
)

export default Author
