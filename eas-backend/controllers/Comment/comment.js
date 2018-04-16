let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')
let validator = require('./validator')

// TODO flag a comment
// TODO delete a comment


router.get('/get-comments-with-earthquake', async (req, res, next) => {

  let params = {
    TableName: process.env.COMMENT_TABLE,
    FilterExpression : 'earthquake_id = :query_id',
    ExpressionAttributeValues : {':query_id': req.query['earthquakeId']},
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
      id: currentEpoch.toString() + req.body['username'],
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
