const { GraphQLScalarType, Kind } = require('graphql')
const model = require('./model.js')

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

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'This is a string for representing Date',
  serialize: checkDate,
  parseValue: checkDate,
  parseLiteral: function (AST) {
    if (AST.kind == Kind.STRING) {
      return checkDate(AST.value)
    } else throw new Error('Date value must String!')
  },
})

function checkDate(value) {
  if (!(typeof value == 'string'))
    throw new Error('Date value must be String!')
  if (!/^([0-9]{4})-([0-1][0-9])-([0-3][0-9])\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/.test(value))
    throw new Error('Date value must be valid email!')

  return value
}

module.exports = {
  Contact: contactScalar,
  Email: emailScalar,
  Date: dateScalar,

  Query: {
    orders: (_, { id, username, product_name, order_created_at, is_paid }) =>
      model.orders({ id, username, product_name, order_created_at, is_paid })
  },

  Order: {
    id: parent => parent.id,
    order_created_at: parent => parent.order_created_at,
    is_paid: parent => parent.is_paid,
    user_id: parent => parent.user_id,
    username: parent => parent.username,
    contact: parent => parent.contact,
    email : parent => parent.email,
    product_name: parent => parent.product_name,
    product_price: parent => parent.product_price,
    shortdesc: parent => parent.shortdesc,
    longdesc: parent => parent.longdesc,
    image_url: parent => parent.image_url,
  },
}
