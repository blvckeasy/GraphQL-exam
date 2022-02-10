const { fetch, fetchAll } = require('../../utils/postgres.js')

const ORDERS = `
	SELECT 
		o.id,
		o.order_created_at as order_created_at,
		o.is_paid as is_paid,
		u.id as user_id,
		u.username as username,
		u.contact as contact,
		u.email as email,
		p.name as product_name,
		p.price as product_price,
		p.shortdesc as shortdesc,
		p.longdesc as longdesc,
		p.picture_url as image_url
	FROM orders o
	LEFT JOIN users u on u.id = o.user_id
	LEFT JOIN products p on p.id = o.product_id
	WHERE
		CASE 
			WHEN $1 > 0 THEN o.id = $1
			ELSE TRUE
		END AND
		CASE 
			WHEN length($2) > 0 THEN u.username = $2
			ELSE TRUE
		END AND
		CASE 
			WHEN length($3) > 0 THEN p.name ILIKE concat($3, '%')
			ELSE TRUE
		END AND
		CASE 
			WHEN length($4) > 0 THEN o.order_created_at = $4::timestamp
			ELSE TRUE
		END AND
		CASE
			WHEN $5 in (TRUE, FALSE) THEN o.is_paid = $5
			ELSE TRUE
		END
	`

const orders = ({ id, username, product_name, order_created_at, is_paid }) => 
	fetchAll(ORDERS, id, username, product_name, order_created_at, is_paid)


module.exports = {
  orders
}

