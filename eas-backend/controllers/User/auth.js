let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')
let helper = require('./helper')
let jwt = require('jsonwebtoken')


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
      isAdmin: false,
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
      data: {
        username: req.body['username'],
        isAdmin: false,
        token: jwt.sign({
          username: req.body['username'],
          isAdmin: false
        }, process.env.JSON_SECRET)
      },
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

router.post('/login', async (req, res, next) => {
  if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
    return res.send({
      data: 'Incomplete info',
      status: false,
    })
  }

  let hashedPassword = helper.getHashed(req.body.password)

  let params = {
    TableName: process.env.USER_TABLE,
    Key: {
      username: req.body['username']
    }
  }

  try {
    let v = await db.get(params).promise()
    if (!v.hasOwnProperty('Item')) {
      return res.send({
        data: 'No such user',
        status: false
      })
    }

    if (v.Item.password === hashedPassword) {

      let isAdmin = v.Item.isAdmin
      let username = v.Item.username

      return res.send({
        data: {
          username: username,
          isAdmin: isAdmin,
          token: jwt.sign({
            username: username,
            isAdmin: isAdmin,
          }, process.env.JSON_SECRET)
        },
        status: true
      })
    } else {
      return res.send({
        data: '',
        status: false
      })
    }

  } catch (err) {
    console.log(err)
    return res.send({
      data: err,
      status: false
    })
  }
})

router.post('/verify-token', async (req, res, next) => {
  if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('isAdmin') || !req.body.hasOwnProperty('token')) {
    return res.send({
      data: 'Incomplete info',
      status: false,
    })
  }

  let username = req.body.username
  let isAdmin = req.body.isAdmin
  let token = req.body.token

  console.log(username)
  console.log(isAdmin)
  console.log(token)

  try {
    let decoded = jwt.verify(token, process.env.JSON_SECRET)

    if (decoded.username === username && decoded.isAdmin === isAdmin) {
      return res.send({
        data: '',
        status: true
      })
    } else {
      return res.send({
        data: '',
        status: false
      })
    }
  } catch (err) {
    console.log(err)
    return res.send({
      data: '',
      status: false
    })
  }
})

module.exports = router