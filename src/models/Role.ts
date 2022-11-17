import { DataTypes, Model, NonAttribute, Optional } from 'sequelize' // eslint-disable-line
import { TABLE_NAMES } from '../helpers/constants'
import { sequelize } from './../config/connection'
import { Permission } from '.'
interface RoleAttributes {
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  id: number;
  name: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  declare permissions?: NonAttribute<Permission[]>;
}

Role.init({
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
}, {
  timestamps: true,
  tableName: TABLE_NAMES.ROLE,
  underscored: true,
  sequelize,
  modelName: 'roles'
})


export default Role
