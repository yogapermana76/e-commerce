const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please fill name']
  },
  price: {
    type: String,
    required: [true, 'please fill price']
  },
  description: {
    type: String,
    required: [true, 'please fill description']
  },
  stock: {
    type: String,
    required: [true, 'please fill stock']
  },
  image: String
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product