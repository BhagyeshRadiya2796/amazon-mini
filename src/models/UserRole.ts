import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'

interface UserRoleAttributes {
  id: number
  userId: string
  roleId: number
  createdAt?: Date
  updatedAt?: Date
}

interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id'> {}

class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
  id: number
  userId: string
  roleId: number
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}
UserRole.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key:'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key:'id'
      }
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: TABLE_NAMES.USER_ROLES,
    underscored: true,
    sequelize
  }
)
export default UserRole
