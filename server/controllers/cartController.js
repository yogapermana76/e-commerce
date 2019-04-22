const Cart = require('../models/cart')

class cartController {

  static addCart(req, res) {
    Cart.create({
      productId: req.body.productId,
      userId: req.body.userId,
      quantity: req.body.quantity
    })
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findAllCart(req, res) {
    Cart.find({
      userId: req.params.id
    })
      .populate('productId')
      .populate('userId')
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteCart(req, res) {
    Cart.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ message: 'successfull deleted' })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = cartController