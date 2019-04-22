const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearProduct = require('../helpers/clearProduct')
const User = require('../models/user')
const { sign } = require('../helpers/jwt')
var productId = null
var UserId = null
var token = null

chai.use(chaiHttp)

before(function(done) {
  clearProduct(done)
  User.create({
    name: 'yoga',
    email: 'yoga2@gmail.com',
    password: '12345',
    role: 'admin'
  })
  .then(createdUser => {
    const { id, email } = createdUser
    UserId = id
    let getToken = sign({
      id: id,
      email: email
    }, process.env.SECRET_KEY)
    token = getToken
  })
})

after(function(done) {
  clearProduct(done)
})


describe('product success', function() {
  
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

  describe('GET /products/', function() {
    it('should be return status 200 and array of object product', function(done) {
      chai
        .request(app)
        .get('/products')
        .set({ token })
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

  describe('PUT /products/', function() {
    it('should be return status 200 and string product', function(done) {
      updateProduct = {
        name: 'new',
        price: 50000,
        description: 'hello',
        stock: 20
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .set({ token })
        .send(updateProduct)
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

  describe('DELETE /products/:id', function() {
    it('should be return status 200 and string product', function(done) {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set({ token })
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

describe('product error', function() {
  describe('POST /products (if user create product with name is empty)', function() {
    it('should be return status 500 and object product', function(done) {
      newProduct = {
        name: '',
        price: 5000,
        description: 'hello world',
        stock: 10
      }
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set({ token })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /products (if user create product with price is empty)', function() {
    it('should be return status 500 and object product', function(done) {
      newProduct = {
        name: 'tes',
        price: '',
        description: 'hello world',
        stock: 10
      }
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set({ token })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /products (if user create product with description is empty)', function() {
    it('should be return status 500 and object product', function(done) {
      newProduct = {
        name: 'tes',
        price: 5000,
        description: '',
        stock: 10
      }
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set({ token })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /products (if user create product with stock is empty)', function() {
    it('should be return status 500 and object product', function(done) {
      newProduct = {
        name: 'tes',
        price: 5000,
        description: 'hello world',
        stock: ''
      }
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set({ token })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

})
