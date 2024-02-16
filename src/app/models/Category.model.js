import { DataTypes } from 'sequelize'
import SequelizeConfig from '@/config/Sequelize.config'

const Category = SequelizeConfig.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      set(val) {
        this.setDataValue('name', val.toLowerCase())
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false, // Tắt tự động thêm timestamps
  }
)

export default Category
