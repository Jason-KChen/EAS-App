let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')


router.post('/new-user', async (req, res, next) => {
  if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
    return res.send({
      data: 'Incomplete info',
      status: false,
    })
  }

  let hashedPassword = ''

  let params = {
    TableName: process.env.USER_TABLE,
    Item: {
      is_admin: false,
      username: req.body['username'],
      password: hashedPassword,
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