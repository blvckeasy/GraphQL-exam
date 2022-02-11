const { GraphQLScalarType, Kind } = require('graphql')
const model = require('./model.js')
const { sign } = require('../../utils/jwt.js')

const contactScalar = new GraphQLScalarType({
  name: 'Contact',
  description: 'This is a string for representing contacts',
  serialize: checkContact,
  parseValue: checkContact,
  parseLiteral: function (AST) {
    if (AST.kind == Kind.STRING) {
      return checkContact(AST.value)
    } else throw new Error('Contact value must String!')
  },
})

function checkContact(value) {
  if (!(typeof value == 'string'))
    throw new Error('Contact value must be String!')
  if (!/^[+]998[389][012345789][0-9]{7}$/.test(value))
    throw new Error('Contact value must be valid contact!')

  return value
}

const emailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'This is a string for representing Email',
  serialize: checkEmail,
  parseValue: checkEmail,
  parseLiteral: function (AST) {
    if (AST.kind == Kind.STRING) {
      return checkEmail(AST.value)
    } else throw new Error('Email value must String!')
  },
})

function checkEmail(value) {
  if (!(typeof value == 'string'))
    throw new Error('Email value must be String!')
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
    throw new Error('Email value must be valid email!')

  return value
}

const passwordScalar = new GraphQLScalarType({
  name: 'Password',
  description: 'This is a string for representing Password',
  serialize: checkPassword,
  parseValue: checkPassword,
  parseLiteral: function (AST) {
    if (AST.kind == Kind.STRING) {
      return checkPassword(AST.value)
    } else throw new Error('Password value must String!')
  },
})

function checkPassword(value) {
  if (!(typeof value == 'string'))
    throw new Error('Password value must be String!')
  if (!/^(?=.*[a-z])(?=.*[a-zA-Z]).{5,20}$/.test(value))
    throw new Error('Password value must be valid password!')

  return value
}

module.exports = {
  Contact: contactScalar,
  Email: emailScalar,
  Password: passwordScalar,

  Role: {
    admin: true,
    user: false
  },

  Query: {
    users: (_, { id, username, contact, email, role }) =>
      model.users({ id, username, contact, email, role }),
  },

  Mutation: {
		registration: (_, { username, password, contact, email, role }) => 
      model.registerUser({ username, password, contact, email, role }),
		login: (_, { username, password }) => 
      model.loginUser({ username, password }),
	},

  User: {
    id: parent => parent.id,
    username: parent => parent.username,
    contact: parent => parent.contact,
    email: parent => parent.email,
    role: parent => parent.role,
    token: parent => sign(parent)
  },
}
