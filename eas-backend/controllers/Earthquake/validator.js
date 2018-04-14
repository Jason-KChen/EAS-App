let validId = (req) => {
  return req.query.hasOwnProperty('earthquakeId')
}

module.exports = {
  validId: validId
}