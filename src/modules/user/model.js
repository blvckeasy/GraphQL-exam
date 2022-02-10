const { fetch, fetchAll } = require('../../utils/postgres.js')

const USERS = `
	SELECT
		*
	FROM users
	WHERE	
		CASE 
			WHEN $1 > 0 THEN id = $1
			ELSE TRUE  
		END AND
		CASE 
			WHEN length($2) > 0 THEN username ILIKE concat($2, '%')
			ELSE TRUE
		END AND
		CASE 
			WHEN length($3) > 0 THEN contact ILIKE concat($3, '%')
			ELSE TRUE
		END AND
		CASE 
			WHEN length($4) > 0 THEN email ILIKE concat($4, '%')
			ELSE TRUE
		END AND
		CASE 
			WHEN $5 in (TRUE, FALSE) THEN role = $5
			ELSE TRUE
		END
`

const REGISTER = `
	INSERT INTO users (username, password, contact, email, role) values ($1, $2, $3, $4, $5) RETURNING *;
`

const LOGIN = `
	SELECT 
		id,
		username,
		contact,
		email,
		role
	FROM users
	WHERE username = $1 and password = $2
`

const users = ({ id, username, contact, email, role }) => 
	fetchAll(USERS, id, username, contact, email, role)

const registerUser = ({username, password, contact, email, role}) => 
	fetchAll(REGISTER, username, password, contact, email, role ? true : false)

const loginUser = ({ username, password }) => 
	fetchAll(LOGIN, username, password)

module.exports = {
  users,
	registerUser,
	loginUser,
}

