const { makeExecutableSchema } = require('@graphql-tools/schema')

const UserModule = require('./user')
const CategoriesModule = require('./category')

module.exports = makeExecutableSchema({
  typeDefs: [UserModule.typeDefs, CategoriesModule.typeDefs],
  resolvers: [UserModule.resolvers, CategoriesModule.resolvers],
})
