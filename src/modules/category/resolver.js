const model = require('./model.js')

module.exports = {
	Query: {
		categories: (_, { id, name }) => model.categories({ id, name })
	},

	Mutation: {
		addCategory: (_, { token, category_name }) => model.addCategory({ token, category_name }),
		deleteCategory: (_, { token, category_id }) => model.deleteCategory({ token, category_id })
	},

	Category: {
		id: parent => parent.id,
		name: parent => parent.name,
	}
}