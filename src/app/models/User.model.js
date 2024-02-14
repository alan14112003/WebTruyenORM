// user.js
import { DataTypes } from 'sequelize'
import Role from './Role.model'
import SequelizeConfig from '@/config/Sequelize.config'

const User = SequelizeConfig.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!')
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.TINYINT,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    roleCode: {
      type: DataTypes.STRING,
      references: {
        model: Role,
        key: 'code',
      },
      onDelete: 'CASCADE',
    },
    resetPassword: {
      type: DataTypes.STRING(6),
    },
    accountBalance: {
      type: DataTypes.INTEGER,
    },
  },
  {
    paranoid: true,
    timestamps: true,
  }
)

User.belongsTo(Role, {
  foreignKey: 'roleCode',
  targetKey: 'code',
})

export default User
