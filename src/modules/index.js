const { makeExecutableSchema } = require('@graphql-tools/schema')

const UserModule = require('./user')
const CategoriesModule = require('./category')
const ProductsModule = require('./product')
const OrdersModule = require('./order')

module.exports = makeExecutableSchema({
  typeDefs: [
    UserModule.typeDefs, 
    CategoriesModule.typeDefs,
    ProductsModule.typeDefs,
    OrdersModule.typeDefs,
  ],
  resolvers: [
    UserModule.resolvers,
    CategoriesModule.resolvers,
    ProductsModule.resolvers,
    OrdersModule.resolvers,
  ],
})
