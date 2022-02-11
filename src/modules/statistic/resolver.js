const model = require('./model.js')


module.exports = {
  Query: {
    statistic: async (_, { paid, toDate, fromDate }) => {
      const price = await model.statistic({ paid, toDate, fromDate })
      return { price: price.reduce( (a, b) => a.price + b.price )}
    },
  },

  Price: {
    price: parent => parent.price
  },
}
