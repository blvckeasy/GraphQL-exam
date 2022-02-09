const { makeExecutableSchema } = require('@graphql-tools/schema')

const UserModule = require('./user')
const CategoriesModule = require('./category')
const ProductsModule = require('./product')

module.exports = makeExecutableSchema({
  typeDefs: [
    UserModule.typeDefs, 
    CategoriesModule.typeDefs,
    ProductsModule.typeDefs,
  ],
  resolvers: [
    UserModule.resolvers,
    CategoriesModule.resolvers,
    ProductsModule.resolvers,
  ],
})
