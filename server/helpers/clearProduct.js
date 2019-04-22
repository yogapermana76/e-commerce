const Product = require('../models/product')

module.exports = function(done) {
  Product
    .deleteMany()
    .then(() => {
      done()
    })
    .catch(err => {
      console.log(err)
    })
}