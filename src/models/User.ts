import { DataTypes, Model, NonAttribute, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'
import { UserRole, Role } from '.'

interface UserAttributes {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes > implements UserAttributes {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string | undefined
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
  
  declare roles?: NonAttribute<Role[]>;
}
User.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 128],
          msg: 'Email address must be between 6 and 128 characters in length'
        },
        isEmail: {
          msg: 'Email address must be valid'
        }
      }
    }
  }, {
    indexes: [{ unique: true, fields: ['email'] }],
    timestamps: true,
    tableName: TABLE_NAMES.USER,
    underscored: true,
    sequelize,
    modelName: 'users'
  }
)

export default User
