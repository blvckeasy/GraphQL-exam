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

const users = ({ id, username, contact, email, role }) => fetchAll(USERS, id, username, contact, email, role)

module.exports = {
  users,
}
