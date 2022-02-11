const { fetch, fetchAll } = require('../../utils/postgres.js')

const STATISTIC = `
	SELECT
		p.price
	FROM orders o
  LEFT JOIN products p ON o.product_id = p.id
	WHERE	
    o.is_paid = $1
`

const statistic = ({ paid }) => fetchAll(STATISTIC, paid)

module.exports = {
  statistic,
}

