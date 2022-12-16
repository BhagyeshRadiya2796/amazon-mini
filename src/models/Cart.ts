import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'

interface CartAttributes {
  id: number
  buyerId: string
  createdAt?: Date
  updatedAt?: Date
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes > implements CartAttributes {
    buyerId: string
    id: number
    createdAt?: Date | undefined
    updatedAt?: Date | undefined

}
Cart.init(
  {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    buyerId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: TABLE_NAMES.CART,
    underscored: true,
    sequelize
  }
)

export default Cart
