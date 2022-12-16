import { DataTypes, Model, Optional } from 'sequelize' // eslint-disable-line
import { sequelize } from './../config/connection'
import { TABLE_NAMES } from '../helpers/constants'

interface ProductAttributes {
  id: string
  name: string
  description: string
  price: number
  sellerId: string
  quantity: number
  createdAt?: Date
  updatedAt?: Date
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes > implements ProductAttributes {
    sellerId: string
    userId: string
    id: string
    name: string
    description: string
    price: number
    quantity: number
    createdAt?: Date | undefined
    updatedAt?: Date | undefined

}
Product.init(
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
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    sellerId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: TABLE_NAMES.PRODUCT,
    underscored: true,
    sequelize
  }
)

export default Product
