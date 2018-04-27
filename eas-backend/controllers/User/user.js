let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')
let helper = require('./helper')


router.get('/get-all-users', async (req, res, next) => {

  let params = {
    TableName: process.env.USER_TABLE,
    FilterExpression: 'isAdmin = :v',
    ExpressionAttributeValues: {':v': false}
  }

  try {

    let result = await db.scan(params).promise()
    let data = result.hasOwnProperty('Items') ? result['Items'] : []

    // console.log(result)

    return res.send({
      data: data,
      status: true,
    })
  } catch (err) {
    console.log(err)
    return res.send({
      data: [err],
      status: false
    })
  }
})

router.post('/delete-user', async (req, res, next) => {
  let params = {
    TableName: process.env.USER_TABLE,
    Key: {
      username: req.body['username']
    }
  }

  try {
    let result = await db.delete(params).promise()

    return res.send({
      data: '',
      status: true
    })
  } catch (err) {
    console.log(err)
    return res.send({
      data: '',
      status: false
    })
  }
})

module.exports = router