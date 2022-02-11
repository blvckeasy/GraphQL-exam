const jwt = require('jsonwebtoken');
const { tokenConfig } = require('../../config.js')
const { fetch } = require('./postgres.js')

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

const checkToken = async (token) => {
  try {
    const FOUND_USER = `
	  SELECT
	  	id
	  FROM users
	  WHERE 
	  	id = $1 and username = $2 and contact = $3 and email = $4;
    `
    const verify_token = verify(token)
    if (!verify_token.id) throw new Error("Invalid token")
	  const found_user = await fetch(FOUND_USER, verify_token.id, verify_token.username, verify_token.contact, verify_token.email)
	  if (!found_user.id) throw new Error("User not defined")
    return verify_token;
  } catch (error) {
    return {ERROR: error.message}
  }
}

module.exports = {
  sign,
  verify,
  checkToken,
}