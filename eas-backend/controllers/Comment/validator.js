let validNewCommentInfo = (req) => {
  return (
    req.body.hasOwnProperty('earthquakeId') &&
    req.body.hasOwnProperty('username') &&
    req.body.hasOwnProperty('content') &&
    req.body.hasOwnProperty('media'))
}

module.exports = {
  validNewCommentInfo: validNewCommentInfo
}