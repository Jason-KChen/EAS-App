let express = require('express')
let router = express.Router()

let earthquake = require('../controllers/Earthquake/earthquake')

router.use('/earthquake', earthquake)

module.exports = router
