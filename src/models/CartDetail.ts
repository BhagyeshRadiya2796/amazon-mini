import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'

interface CartDetailAttributes {
  id: number
  cartId: number
  productId: number
  quantity: number
  price: number
  createdAt?: Date
  updatedAt?: Date
}

interface CartDetailCreationAttributes extends Optional<CartDetailAttributes, 'id'> {}

class CartDetail extends Model<CartDetailAttributes, CartDetailCreationAttributes > implements CartDetailAttributes {
    productId: number
    quantity: number
    price: number
    cartId: number
    id: number
    createdAt?: Date | undefined
    updatedAt?: Date | undefined

}
CartDetail.init(
  {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cartId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'carts',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: TABLE_NAMES.CART_DETAIL,
    underscored: true,
    sequelize
  }
)

export default CartDetail
