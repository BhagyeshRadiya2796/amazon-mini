import User from './User'
import Role from './Role'
import Permission  from './Permission'
import UserRole from './UserRole'
import RolePermission from './RolePermission'
import Product from './Product'

User.hasMany(Product, {
  foreignKey: 'user_id'
})
Product.belongsTo(User)

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

Role.belongsToMany(Permission, { through: RolePermission })
Permission.belongsToMany(Role, { through: RolePermission })

export { User, Role, Permission, UserRole, RolePermission, Product }