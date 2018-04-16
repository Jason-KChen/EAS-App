let express = require('express')
let router = express.Router()

let earthquake = require('../controllers/Earthquake/earthquake')
let comment = require('../controllers/Comment/comment')

router.use('/earthquake', earthquake)
router.use('/comment', comment)

module.exports = router
