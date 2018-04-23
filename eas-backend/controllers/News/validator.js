let validNewsQuery = (req) => {
  return (req.query.hasOwnProperty('time') && req.query.hasOwnProperty('location') && req.query.hasOwnProperty('country'))
}

module.exports = {
  validNewsQuery: validNewsQuery
}