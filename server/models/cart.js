const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: Number
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart