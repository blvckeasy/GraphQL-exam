require('dotenv').config()

const tokenConfig = {
  time: 60 * 60 * 24,
  key: process.env.SECRET_KEY
}

module.exports = {
  tokenConfig
}