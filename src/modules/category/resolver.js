const model = require('./model.js')

module.exports = {
	Query: {
		categories: (_, { id, name }) => model.categories({ id, name })
	},

	Category: {
		id: parent => parent.id,
		name: parent => parent.name,
	}
}