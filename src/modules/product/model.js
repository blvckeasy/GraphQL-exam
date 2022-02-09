const { fetch, fetchAll } = require('../../utils/postgres.js')

const PRODUCTS = `
  SELECT
    *
  FROM products
  WHERE  
  CASE 
    WHEN $1 > 0 THEN id = $1
    ELSE TRUE
  END AND
  CASE
    WHEN $2 > 0 THEN category_id = $2
    ELSE TRUE
  END AND
  CASE 
    WHEN length($3) > 0 THEN name ILIKE concat($3, '%')
    ELSE TRUE
  END AND
  CASE
    WHEN $4 > 0 THEN price = $4
    ELSE TRUE
  END AND
  CASE
    WHEN length($5) > 0 THEN shortDesc ILIKE concat('%', $5, '%')
    ELSE TRUE
  END AND
  CASE
    WHEN length($6) > 0 THEN longDesc ILIKE concat('%', $6, '%')
    ELSE TRUE
  END
`

const products = ({ id, category_id, name, price, shortDesc, longDesc }) =>
  fetchAll(PRODUCTS, id, category_id, name, price, shortDesc, longDesc)

module.exports = {
  products,
}
