import { DataTypes } from 'sequelize'
import SequelizeConfig from '@/config/Sequelize.config'

const Story = SequelizeConfig.define(
  'Story',
  {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    isFull: {
      type: DataTypes.BOOLEAN,
    },
    access: {
      type: DataTypes.TINYINT,
    },
    descriptions: {
      type: DataTypes.TEXT,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.TINYINT,
    },
  },
  {
    paranoid: true,
  }
)

export default Story
