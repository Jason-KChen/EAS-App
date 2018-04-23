let crypto = require('crypto')

// add random salt in the future
let getHashed = (password) => {
  let hash = crypto.createHmac('sha512', process.env.SALT)
  hash.update(password)

  return hash.digest('hex')
}

module.exports = {
  getHashed: getHashed
}