const jwt = require('jsonwebtoken');
const { tokenConfig } = require('../../config.js')

const sign = (data) => {
  try {
    return jwt.sign(data, tokenConfig.key,  { expiresIn: tokenConfig.time })
  } catch (error) {
    return error.message
  }
}

const verify = (data) => {
  try {
    return jwt.verify(data, tokenConfig.key)
  } catch (error) {
    throw new Error('Invalid token')
  }
}


module.exports = {
  sign,
  verify,
}