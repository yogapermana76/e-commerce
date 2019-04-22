const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearCart = require('../helpers/clearCart')
const clearUser = require('../helpers/clearUser')
const User = require('../models/user')
const { sign } = require('../helpers/jwt')

var cartId = null
var productId = null
var userId = null

chai.use(chaiHttp)

before(function(done) {
  clearCart(function () {
    User.create({
      name: 'yoga',
      email: 'yoga@gmail.com',
      password: '12345',
      role: 'admin'
    })
    .then(createdUser => {
      console.log('before invoked');
      const { id, email } = createdUser
      UserId = id
      let getToken = sign({
        id: id,
        email: email
      }, process.env.SECRET_KEY)
      token = getToken
      done();
    })
  })
})

after(function(done) {

  clearCart(function() {
    clearUser(function() {
      done()
    })
  })

})

describe('cart success', function() {

  describe('POST /products/', function() {
    it('should be return status 201 and object product', function(done) {
      let newProduct = {
        name: 'apa',
        price: 5000,
        description: 'hello world',
        stock: 10
      }
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .then(res => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('stock')
          productId = res.body._id
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /carts/', function() {
    it('should be return 201 and object cart', function(done) {
      let newCart = {
        productId: productId,
        userId: userId,
        quantity: 5
      }
      chai
        .request(app)
        .post('/carts')
        .send(newCart)
        .then(res => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('productId')
          expect(res.body).to.have.property('userId')
          expect(res.body).to.have.property('quantity')
          cartId = res.body._id
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('GET /carts/', function() {
    it('should be return 200 and array of object cart', function(done) {
      chai
        .request(app)
        .get('/carts')
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('DELETE /carts/:id', function() {
    it('should be return 200 and object cart', function(done) {
      chai
        .request(app)
        .delete(`/carts/${cartId}`)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
})
