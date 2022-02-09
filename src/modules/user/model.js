const { fetch, fetchAll } = require('../../utils/postgres.js')

const USERS = `
	SELECT
		*
	FROM users
	WHERE
	CASE
		WHEN $1 > 0 THEN user_id = $1
		ELSE TRUE
	END
`

const users = ({ userId }) => fetchAll(USERS, userId)


module.exports = {
	users
}