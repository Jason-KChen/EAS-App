let express = require('express')
let router = express.Router()
// let db = require('./../../db/dynamoCon')
let redshift = require('./../../db/redshiftCon')
// let validator = require('./validator')

const testQuery = `select place, id from eas_prod where time > 1523375443100`
const baseQuery = `select place, id , time from eas_prod where `
const queryPostfix = ` order by time limit 1000`

router.get('/search-test', async (req, res, next) => {

  try {
    let result = await redshift.query(testQuery)
    res.send({
      data: result.rows,
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

router.get('/search', async (req, res, next) => {

  try {
    // need to shift condition construction from frontend to backend in the future, SQL injection
    let finalQuery = baseQuery + req.query['condition'] + queryPostfix
    console.log(finalQuery)

    let result = await redshift.query(finalQuery)
    res.send({
      data: result.rows,
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

router.get('/aggregate', async (req, res, next) => {

  try {
    let finalColumnName = ''
    let aggregateValuePhrase = ''
    let groupByPhrase = ''


    let condition = req.query['condition']
    let groupByOption = req.query['groupByOption']
    let aggregationOption = req.query['aggregationOption']
    let distinct = req.query['distinct']
    let countColumn = req.query['countColumn']
    let valueColumn = req.query['valueColumn']


    switch (groupByOption) {
      case 'year':
        finalColumnName = `select date_part('year', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds')) as year, `
        groupByPhrase = `group by date_part('year', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds')) order by date_part('year', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds'));`
        break
      case 'month':
        finalColumnName = `select date_part('month', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds')) as month, `
        groupByPhrase = `group by date_part('month', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds')) order by date_part('month', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds'));`
        break
      case 'day':
        finalColumnName = `select date_part('day', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds')) as day, `
        groupByPhrase = `group by date_part('day', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds')) order by date_part('day', (TIMESTAMP 'epoch' + time/1000 *INTERVAL '1 seconds'));`
        break
      case 'country':
        finalColumnName = `select country, `
        groupByPhrase = `group by country order by country;`
        break
      case 'depth::int':
        finalColumnName = `select depth::int, `
        groupByPhrase = `group by depth::int order by depth::int;`
        break
      case 'mag::int':
        finalColumnName = `select mag::int, `
        groupByPhrase = `group by mag::int order by mag::int;`
        break
      case 'magnitude_type':
        finalColumnName = `select magnitude_type, `
        groupByPhrase = `group by magnitude_type order by magnitude_type;`
        break
      case 'status':
        finalColumnName = `select status, `
        groupByPhrase = `group by status order by status;`
        break
      case 'tsunami':
        finalColumnName = `select tsunami, `
        groupByPhrase = `group by tsunami order by tsunami;`
        break
    }

    switch (aggregationOption) {
      case 'count':
        if (distinct === 'yes') {
          aggregateValuePhrase = 'DISTINCT ' + countColumn
        } else {
          aggregateValuePhrase = countColumn
        }

        aggregateValuePhrase = 'count(' + aggregateValuePhrase + ') from eas_prod'
        break
      case 'min':
        aggregateValuePhrase = 'min(' + valueColumn + ') from eas_prod'
        break
      case 'max':
        aggregateValuePhrase = 'max(' + valueColumn + ') from eas_prod'
        break
      case 'average':
        aggregateValuePhrase = 'average(' + valueColumn + ') from eas_prod'
        break
    }

    let finalQuery = finalColumnName + aggregateValuePhrase
    if (condition.length > 0) {
      finalQuery += ' where ' + condition + ' ' + groupByPhrase
    } else {
      finalQuery += ' ' + groupByPhrase
    }
    console.log(finalQuery)

    let result = await redshift.query(finalQuery)
    res.send({
      data: result.rows,
      status: true,
    })
    // res.send({
    //   data: finalQuery,
    //   status: true,
    // })
  } catch (err) {
    console.log(err)
    res.send({
      data: [],
      status: false
    })
  }
})




module.exports = router
