import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'
import RolePermission from './RolePermission'

interface PermissionAttributes {
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'id'> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
  id: number
  name: string
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}
Permission.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: TABLE_NAMES.PERMISSIONS,
    underscored: true,
    sequelize
  }
)
Permission.hasMany(RolePermission, {
  foreignKey: 'permission_id'
})
export default Permission
