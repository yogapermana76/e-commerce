const Cart = require('../models/cart')

module.exports = function(cb) {
  Cart
    .deleteMany()
    .then(() => {
      cb()
    })
    .catch(err => {
      console.log(err)
    })
}