const Product = require('../models/product')

class ProductController {
  static addProduct(req, res) {
    Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      image: req.file.gcsUrl
    })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getAllProduct(req, res) {
    Product.find({})
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findOneProduct(req, res) {
    Product.findById(req.params.id)
      .then(foundProduct => {
        res.status(200).json(foundProduct)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteProduct(req, res) {
    Product.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ message: 'success deleted' })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static updateProduct(req, res) {
    Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock
    })
      .then(() => {
        res.status(200).json({ message: 'success updated' })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
} 

module.exports = ProductController