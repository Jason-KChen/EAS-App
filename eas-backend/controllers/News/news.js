let express = require('express')
let router = express.Router()
let db = require('./../../db/dynamoCon')
let validator = require('./validator')
let axios = require('axios')
let stateLookup = require('madison')

let BASE_URL = 'https://newsapi.org/v2/everything'

router.get('/get-relevant-news', async (req, res, next) => {

  if (!validator.validNewsQuery(req)) {
    return res.send({
      data: 'Missing attributes',
      status: false
    })
  }

  let location = req.query['location']
  if (req.query['country'].toLowerCase() === 'us' && location.length === 2) {
    let temp = stateLookup.getStateNameSync(location.toLowerCase())

    if (temp !== null && temp.length > 0) {
      location = temp
    }
  }

  try {
    let request = await axios.get(BASE_URL, {
      params: {
        q: location,
        from: req.query['time'],
        to: req.query['time'],
        sortBy: 'popularity',
        apiKey: process.env.NEWSAPI_KEY
      }
    })
    if (request.data.status) {
      return res.send({
        data: request.data.articles,
        status: true
      })
    }

    console.log(request.data.articles)
    return res.send({
      data: 'Something wrong',
      status: false
    })
  } catch (err) {
    return res.send({
      data: 'Missing attributes',
      status: false
    })
  }
})

module.exports = router


