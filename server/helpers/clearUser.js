const User = require('../models/user')

module.exports = function(cb) {
  User
    .deleteMany()
    .then(() => {
      cb()
    })
    .catch(err => {
      console.log(err)
    })
}