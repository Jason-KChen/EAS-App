let express = require('express')
let router = express.Router()

let earthquake = require('../controllers/Earthquake/earthquake')
let comment = require('../controllers/Comment/comment')
let news = require('../controllers/News/news')
let user = require('../controllers/User/user')

router.use('/earthquake', earthquake)
router.use('/comment', comment)
router.use('/news', news)
router.use('/auth', user)

module.exports = router
