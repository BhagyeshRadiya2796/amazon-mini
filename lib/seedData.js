const defaultUser = [
  {
    "id": "687604d0-6746-11ed-8089-db73df5478fd",
    "first_name": 'admin',
    "last_name": 'user',
    "password": 'admin',
    "email": 'admin@user.com',
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "id": "677604d0-6746-11ed-8089-db73df5478fi",
    "first_name": 'buyer',
    "last_name": 'user',
    "password": 'buyer',
    "email": 'buyer@user.com',
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "id": "667604d0-6746-11ed-8089-db73df5478fu",
    "first_name": 'seller',
    "last_name": 'user',
    "password": 'seller',
    "email": 'seller@user.com',
    "created_at": new Date(),
    "updated_at": new Date()
  }
]
const defaultRoles = [
  {
    "name": 'admin',
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "name": 'buyer',
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "name": 'seller',
    "created_at": new Date(),
    "updated_at": new Date()
  }
]
const defaultUsersRoles = [
  {
    user_id: '687604d0-6746-11ed-8089-db73df5478fd',
    role_id: 1, 
    created_at: new Date(), 
    updated_at: new Date()
  },
  {
    user_id: "677604d0-6746-11ed-8089-db73df5478fi",
    role_id: 2, 
    created_at: new Date(), 
    updated_at: new Date()
  },
  {
    user_id: "667604d0-6746-11ed-8089-db73df5478fu",
    role_id: 3, 
    created_at: new Date(), 
    updated_at: new Date()
  }
]
const rolePermissions = [
  {
    role_id: 1,
    permission_id: 1
  },
  {
    role_id: 1,
    permission_id: 2
  },
  {
    role_id: 1,
    permission_id: 3
  },
  {
    role_id: 1,
    permission_id: 4
  },
  {
    role_id: 1,
    permission_id: 5
  },
  {
    role_id: 1,
    permission_id: 6
  },
  {
    role_id: 1,
    permission_id: 7
  },
  {
    role_id: 1,
    permission_id: 8
  },
  {
    role_id: 2,
    permission_id: 5
  },
  {
    role_id: 2,
    permission_id: 7
  },
  {
    role_id: 2,
    permission_id: 8
  },
  {
    role_id: 2,
    permission_id: 9
  },
  {
    role_id: 2,
    permission_id: 10
  },
  {
    role_id: 3,
    permission_id: 5
  },
  {
    role_id: 3,
    permission_id: 6
  },
  {
    role_id: 3,
    permission_id: 7
  }
]
const permissions = [
  'view_users',
  'edit_users',
  'view_roles',
  'edit_roles',
  'view_products',
  'edit_products',
  'view_orders',
  'edit_orders',
  'view_carts',
  'edit_carts'
]; 
module.exports = {defaultUser, defaultUsersRoles,rolePermissions, defaultRoles, permissions}