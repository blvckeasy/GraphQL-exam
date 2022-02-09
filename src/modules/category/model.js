const { fetch, fetchAll } = require('../../utils/postgres.js')

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
		END
`

const categories = ({ id, name }) => fetchAll(CATEGORIES, id, name)

module.exports = {
  categories,
}
