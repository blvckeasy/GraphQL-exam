const {
    ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageGraphQLPlayground 
} = require('apollo-server-core')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')

const config = require('../config.js')
const schema = require('./modules')


async function startApolloServer(typeDefs, resolvers) {
    const app = express()
    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    })

    await server.start()
    server.applyMiddleware({ app })

    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}


startApolloServer()