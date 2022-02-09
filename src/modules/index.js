const { makeExecutableSchema } =require('@graphql-tools/schema')

const UserModule = require('./user')

module.exports = makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
    ],
    resolvers: [
        UserModule.resolvers,
    ]
})