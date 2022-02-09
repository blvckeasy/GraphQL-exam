const model = require('./model.js')

module.exports = {
  Query: {
    users: (_, { id, username, contact, email, role }) =>
      model.users({ id, username, contact, email, role }),
  },

  User: {
    id: parent => parent.id,
    username: parent => parent.username,
    contact: parent => parent.contact,
    email: parent => parent.email,
    role: parent => parent.role,
  },
}
