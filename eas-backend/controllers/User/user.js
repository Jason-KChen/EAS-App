let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')
let helper = require('./helper')


router.post('/new-user', async (req, res, next) => {
  if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
    return res.send({
      data: 'Incomplete info',
      status: false,
    })
  }

  let hashedPassword = helper.getHashed(req.body.password)

  let vParams = {
    TableName: process.env.USER_TABLE,
    Key: {
      username: req.body['username']
    }
  }

  let params = {
    TableName: process.env.USER_TABLE,
    Item: {
      is_admin: false,
      username: req.body['username'],
      password: hashedPassword,
    }
  }

  try {
    let v = await db.get(vParams).promise()
    if (v.hasOwnProperty('Item')) {
      return res.send({
        data: 'User already exits',
        status: false
      })
    }

    let result = await db.put(params).promise()
    return res.send({
      data: [''],
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

router.get('/get-all-users', async (req, res, next) => {

  let params = {
    TableName: process.env.USER_TABLE,
    FilterExpression: 'is_admin = :v',
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