import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { ORDER_STATUS, ORDER_STATUS_ARRAY, TABLE_NAMES } from '../helpers/constants'

interface OrderAttributes {
  id: number
  buyerId: string
  status: ORDER_STATUS
  createdAt?: Date
  updatedAt?: Date
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes > implements OrderAttributes {
    buyerId: string
    id: number
    status: ORDER_STATUS 
    createdAt?: Date | undefined
    updatedAt?: Date | undefined

}
Order.init(
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
    },
    status: {
        type: DataTypes.ENUM({
            values: ORDER_STATUS_ARRAY
        }),
        allowNull: true,

    }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: TABLE_NAMES.ORDER,
    underscored: true,
    sequelize
  }
)

export default Order
