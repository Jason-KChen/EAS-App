let express = require('express')
let router = express.Router()
// let db = require('./../../db/dynamoCon')
let redshift = require('./../../db/redshiftCon')
// let validator = require('./validator')

const testQuery = `select place, id from eas_prod where time > 1523375443100`
const baseQuery = `select place, id from eas_prod where `

router.get('/search-test', async (req, res, next) => {

  try {
    let result = await redshift.query(testQuery)
    res.send({
      data: result.rows,
      status: true,
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: [],
      status: false
    })
  }
})

router.get('/search', async (req, res, next) => {

  try {
    // need to shift condition construction from frontend to backend in the future, SQL injection
    let result = await redshift.query(baseQuery + req.query['condition'])
    res.send({
      data: result.rows,
      status: true,
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: [],
      status: false
    })
  }
})




module.exports = router
