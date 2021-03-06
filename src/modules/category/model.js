const { fetch, fetchAll } = require('../../utils/postgres.js')
const { verify, checkToken } = require('../../utils/jwt.js')

const CATEGORIES = `
	SELECT
		*
	FROM categories
	WHERE	
		CASE
			WHEN $1 > 0 THEN id = $1
			ELSE TRUE
		END AND
		CASE 
			WHEN length($2) > 0 THEN name ILIKE concat($2, '%')
			ELSE TRUE
		END;
`

const FOUND_USER = `
	SELECT
		id
	FROM users
	WHERE 
		id = $1 and username = $2 and contact = $3 and email = $4;
`

const ADD_CATEGORY = `
	INSERT INTO categories (name) VALUES ($1) RETURNING *;
`

const EDIT_CATEGORY = `
	UPDATE categories SET name = $1 WHERE id = $2 RETURNING *; 
`

const DELETE_CATEGORY = `
	DELETE FROM categories WHERE id = $1 RETURNING *;
`


const categories = ({ id, name }) => fetchAll(CATEGORIES, id, name)

const addCategory = async ({ token, category_name }) => {
  try {
		checkToken(token)
		return await fetch(ADD_CATEGORY, category_name)
	} catch (error) {
		return error
	}
}

const editCategory = async ({ token,  category_id, category_name }) => {
	try {
		checkToken(token)
		return await fetch(EDIT_CATEGORY, category_name, category_id)
	} catch (error) {
		return error.message
	}
}

const deleteCategory = async ({ token, category_id }) => {
	try {
		checkToken(token)
		return await fetch(DELETE_CATEGORY, category_id)
	} catch (error) {
		return error.message
	}
}

module.exports = {
  categories,
  addCategory,
	editCategory,
	deleteCategory,
}
