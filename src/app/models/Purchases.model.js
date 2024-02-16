import SequelizeConfig from '@/config/Sequelize.config'
import { DataTypes } from 'sequelize'

const Purchases = SequelizeConfig.define('Purchases', {
  price: {
    type: DataTypes.INTEGER,
  },
})

export default Purchases
