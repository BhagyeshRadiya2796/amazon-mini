import User from './User'
import Role from './Role'
import Permission  from './Permission'
import UserRole from './UserRole'
import RolePermission from './RolePermission'
import Product from './Product'
import Cart from './Cart'
import CartDetail from './CartDetail'
import Order from './Order'
import OrderDetail from './OrderDetail'

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

Role.belongsToMany(Permission, { through: RolePermission })
Permission.belongsToMany(Role, { through: RolePermission })

User.hasMany(Product, { foreignKey: 'sellerId' })
Product.belongsTo(User, { foreignKey: 'sellerId' })

User.hasOne(Cart, { foreignKey: 'buyerId'})
Cart.belongsTo(User, { foreignKey: 'buyerId'})

Product.belongsToMany(Cart, { through: CartDetail})
Cart.belongsToMany(Product, { through: CartDetail})

Product.belongsToMany(Order, { through: OrderDetail})
Order.belongsToMany(Product, { through: OrderDetail})

User.hasOne(Order, { foreignKey: 'buyerId'})
Order.belongsTo(User, { foreignKey: 'buyerId'})

export { User, Role, Permission, UserRole, RolePermission, Product , Cart, CartDetail, Order, OrderDetail}