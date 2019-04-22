const User = require('../models/user')

module.exports = {
  authorization(req, res, next) {
    let userId = req.authenticated.id

    User.findById(userId)
      .then(foundUser => {
        if(foundUser.role == 'admin') {
          res.status(200).json(foundUser)
          next()
        }
      })
      .catch(err => {
        res.status(401).json(err)
      })
  }
}