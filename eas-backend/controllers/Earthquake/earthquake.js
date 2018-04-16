let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')
let validator = require('./validator')

router.get('/get-live-earthquakes', async (req, res, next) => {
  let currentEpoch = Date.now() - 14400000

  let params = {
    TableName: process.env.DYNAMODB_EAS_LIVE,
    FilterExpression : '#t >= :time',
    ExpressionAttributeNames: {"#t": "time"},
    ExpressionAttributeValues : {':time': currentEpoch},
    ProjectionExpression: "longitude, latitude, id"
  }

  try {
    let result = await db.scan(params).promise()
    let data = result.hasOwnProperty('Items') ? result['Items'] : []
    res.send({
      data: data,
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

router.get('/get-earthquake-info', async (req, res, next) => {
  if (!validator.validId(req)) {
    return res.send({
      data: 'No ID',
      status: false
    })
  }

  let params = {
    TableName: process.env.DYNAMODB_EAS_PROD,
    Key: {
      id: req.query['earthquakeId'],
    }
  }
  try {
    let result = await db.get(params).promise()
    let data = result.hasOwnProperty('Item') ? [result['Item']] : []
    res.send({
      data: data,
      status: true
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
