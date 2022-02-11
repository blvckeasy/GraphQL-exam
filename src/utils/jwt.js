const jwt = require('jsonwebtoken');
const { tokenConfig } = require('../../config.js')

const sign = (data) => jwt.sign(data, tokenConfig.key,  { expiresIn: tokenConfig.time })
const verify = (data) => jwt.verify(data, tokenConfig.key)


module.exports = {
  sign,
  verify,
}