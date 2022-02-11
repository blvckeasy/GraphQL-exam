const { fetch, fetchAll } = require('../../utils/postgres.js')
const { verify } = require('../../utils/jwt.js')

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

const DELETE_CATEGORY = `
	DELETE FROM categories WHERE id = $1 RETURNING *;
`

const categories = ({ id, name }) => fetchAll(CATEGORIES, id, name)
const addCategory = async ({ token, category_name }) => {
  try {
		const verify_token = verify(token)
  	if (!verify_token.id) throw new Error("Invalid token")
		const found_user = await fetch(FOUND_USER, verify_token.id, verify_token.username, verify_token.contact, verify_token.email)
		if (!found_user.id) throw new Error("User not defined")
		return await fetch(ADD_CATEGORY, category_name)
	} catch (error) {
		return error
	}
}

const deleteCategory = async ({ token, category_id }) => {
	try {
		const verify_token = verify(token)
  	if (!verify_token.id) throw new Error("Invalid token")
		const found_user = await fetch(FOUND_USER, verify_token.id, verify_token.username, verify_token.contact, verify_token.email)
		if (!found_user.id) throw new Error("User not defined")
		return await fetch(DELETE_CATEGORY, category_id)
	} catch (error) {
		return error
	}
}


module.exports = {
  categories,
  addCategory,
	deleteCategory,
}
