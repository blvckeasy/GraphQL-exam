const model = require('./model.js')

module.exports = {
	Query: {
		users: (_, { userId }) => model.users({ userId })
	},

	User: {
		userId: global => global.user_id,
		birthDate: global => global.birth_date,
	}
}