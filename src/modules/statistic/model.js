const { fetch, fetchAll } = require('../../utils/postgres.js')

const STATISTIC = `
	SELECT
		p.price
	FROM orders o
  LEFT JOIN products p ON o.product_id = p.id
	WHERE	
    o.is_paid = $1 and
    CASE 
      WHEN length($2) > 0 THEN $2::timestamp <= o.order_created_at
      ELSE TRUE
    END AND
    CASE 
      WHEN length($3) > 0 THEN $3::timestamp >= o.order_created_at
      ELSE TRUE
    END
`
const statistic = ({ paid, toDate, fromDate }) => fetchAll(STATISTIC, paid, toDate, fromDate)


module.exports = {
  statistic,
}

