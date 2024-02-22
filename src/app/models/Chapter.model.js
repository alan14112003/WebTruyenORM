import SequelizeConfig from '@/config/Sequelize.config'
import { DataTypes } from 'sequelize'

const Chapter = SequelizeConfig.define(
  'Chapter',
  {
    number: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT('long'),
    },
    isFree: {
      type: DataTypes.BOOLEAN,
    },
    privateEnd: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    access: {
      type: DataTypes.TINYINT,
    },
    type: {
      type: DataTypes.TINYINT,
    },
  },
  {
    paranoid: true,
  }
)

export default Chapter
