const { gql } = require('apollo-server-express')
const path = require('path')
const fs = require('fs')

const resolvers = require('./resolver.js')
const schema = fs.readFileSync(path.join(__dirname, 'schema.gql'), 'UTF-8')

module.exports = {
	resolvers: resolvers,
	typeDefs: gql`${schema}`
}