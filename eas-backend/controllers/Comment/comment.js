let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')
let validator = require('./validator')

router.post('/flag-comment', async (req, res, next) => {
  if (!req.body['username'] || !req.body['time']) {
    return res.send({
      data: 'Missing attributes',
      status: false
    })
  }

  let params = {
    TableName: process.env.COMMENT_TABLE,
    UpdateExpression: 'set flagged = :x',
    Key: {
      'username': req.body['username'],
      'time': req.body['time']
    },
    ExpressionAttributeValues: {
      ':x' : true
    }
  }

  try {
    let result = await db.update(params).promise()

    res.send({
      data: 'Good',
      status: true
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: 'Something went wrong',
      status: false
    })
  }
})

router.post('/unflag-comment', async (req, res, next) => {
  if (!req.body['username'] || !req.body['time']) {
    return res.send({
      data: 'Missing attributes',
      status: false
    })
  }

  let params = {
    TableName: process.env.COMMENT_TABLE,
    UpdateExpression: 'set flagged = :x',
    Key: {
      'username': req.body['username'],
      'time': req.body['time']
    },
    ExpressionAttributeValues: {
      ':x' : false
    }
  }

  try {
    let result = await db.update(params).promise()

    res.send({
      data: 'Good',
      status: true
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: 'Something went wrong',
      status: false
    })
  }
})

router.post('/delete-comment', async (req, res, next) => {
  if (!req.body.hasOwnProperty('username') || !req.body['time']) {
    return res.send({
      data: 'Missing comment id',
      status: false
    })
  }

  let params = {
    TableName: process.env.COMMENT_TABLE,
    Key: {
      username: req.body['username'],
      time: req.body['time']
    }
  }

  try {
    let result = await db.delete(params).promise()

    res.send({
      data: 'Good',
      status: true
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: 'Something went wrong',
      status: false
    })
  }
})

router.get('/get-comments-with-earthquake', async (req, res, next) => {

  let params = {
    TableName: process.env.COMMENT_TABLE,
    FilterExpression : 'earthquake_id = :query_id',
    ExpressionAttributeValues : {':query_id': req.query['earthquakeId']},
    ScanIndexForward: true
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

router.get('/get-flagged-comments', async (req, res, next) => {

  let params = {
    TableName: process.env.COMMENT_TABLE,
    FilterExpression : 'flagged = :v',
    ExpressionAttributeValues : {':v': true},
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


router.post('/new-comment', async (req, res, next) => {
  if (!validator.validNewCommentInfo(req)) {
    return res.send({
      data: 'Incomplete info',
      status: false,
    })
  }

  let currentEpoch = Date.now()

  let params = {
    TableName: process.env.COMMENT_TABLE,
    Item: {
      flagged: false,
      username: req.body['username'],
      earthquake_id: req.body['earthquakeId'],
      time: currentEpoch,
      content: req.body['content'],
      media_url: req.body['media']
    }
  }

  try {
    let result = await db.put(params).promise()
    res.send({
      data: [''],
      status: true,
    })
  } catch (err) {
    console.log(err)
    res.send({
      data: [err],
      status: false
    })
  }
})



module.exports = router
