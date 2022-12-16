import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'

interface OrderDetailAttributes {
  id: number
  cartId: number
  productId: number
  quantity: number
  price: number
  createdAt?: Date
  updatedAt?: Date
}

interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, 'id'> {}

class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes > implements OrderDetailAttributes {
    productId: number
    quantity: number
    price: number
    cartId: number
    id: number
    createdAt?: Date | undefined
    updatedAt?: Date | undefined

}
OrderDetail.init(
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
    tableName: TABLE_NAMES.ORDER_DETAIL,
    underscored: true,
    sequelize
  }
)

export default OrderDetail
