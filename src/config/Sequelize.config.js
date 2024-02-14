import { Sequelize } from 'sequelize'

const SequelizeConfig = new Sequelize('webtruyen_nodejs_orm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (...msg) => {
    console.warn('----------SQL----------')
    console.warn(...msg)
    console.warn('--------END SQL--------')
  },
})

const test = async () => {
  try {
    await SequelizeConfig.authenticate()

    // await SequelizeConfig.sync({ alter: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
test()

export default SequelizeConfig
