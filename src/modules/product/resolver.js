const model = require('./model.js')

module.exports = {
  Query: {
    products: (_, { id, category_id, name, price, shortDesc, longDesc }) =>
      model.products({ id, category_id, name, price, shortDesc, longDesc }),
  },

  Product: {
    id: parent => parent.id,
    category_id: parent => parent.category_id,
    name: parent => parent.name,
    price: parent => parent.price,
    shortDesc: parent => parent.shortdesc,
    longDesc: parent => parent.longdesc,
    picture_url: parent => parent.picture_url,
  },
}
