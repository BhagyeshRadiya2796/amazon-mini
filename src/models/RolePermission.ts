import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'

interface RolePermissionAttributes {
  id: number
  roleId: string
  permissionId: number
  createdAt?: Date
  updatedAt?: Date
}

interface RolePermissionCreationAttributes extends Optional<RolePermissionAttributes, 'id'> {}

class RolePermission extends Model<RolePermissionAttributes, RolePermissionCreationAttributes> implements RolePermissionAttributes {
  id: number
  roleId: string
  permissionId: number
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}
RolePermission.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key:'id'
      }
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'permissions',
        key:'id'
      }
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: TABLE_NAMES.ROLE_PERMISSIONS,
    underscored: true,
    sequelize
  }
)

export default RolePermission
