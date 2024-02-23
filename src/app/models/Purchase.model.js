import SequelizeConfig from '@/config/Sequelize.config'
import { DataTypes } from 'sequelize'

const Purchase = SequelizeConfig.define('Purchase', {
  price: {
    type: DataTypes.INTEGER,
  },
})

export default Purchase
