const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.RS_USER,
  database: process.env.RS_DB,
  host: process.env.RS_HOST,
  password: process.env.RS_PW,
  port: process.env.RS_PORT
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}