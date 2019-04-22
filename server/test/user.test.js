const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app.js')
const clearUser = require('../helpers/clearUser')

var userId = null
var token = null

chai.use(chaiHttp)

before(function(done) {
  clearUser(done)
})

after(function(done) {
  clearUser(done)
})

describe('users success', function() {

  describe('POST /users', function() {
    it('should be return status 201 and object user', function(done) {
      let newUser = {
        name: 'yoga',
        email: 'yoga@gmail.com',
        password: '12345',
        role: 'user'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .then(res => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          expect(res.body).to.have.property('role')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users', function() {
    it('should be return status 200 and object user', function(done) {
      let newUser = {
        email: 'yoga@gmail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(newUser)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          expect(res.body).to.have.property('id')
          token = res.body.token
          userId = res.body.id
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

})

describe('user error', function() {

  describe('POST /users/register (if user register with an existing email)', function() {
    it('should return an object and status 401', function(done) {
      let user = {
        name: 'yoga',
        email: 'yoga@gmail.com',
        password: '12345',
        role: 'user'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(res => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('string')
          expect(res.body).include('email already exist')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users/register (if user register with an invalid email)', function() {
    it('should return an object and status 500', function(done) {
      let user = {
        name: 'yoga',
        email: 'yoga.gmail.com',
        password: '12345',
        role: 'user'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('string')
          expect(res.body).include('valid')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users/register (if user register with an empty name)', function() {
    it('should return an object and status 500', function(done) {
      let user = {
        name: '',
        email: 'permana@gmail.com',
        password: '12345',
        role: 'user'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('string')
          expect(res.body).include('please fill name')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users/register (if user register with an empty email)', function() {
    it('should return an object and status 500', function(done) {
      let user = {
        name: 'yoga',
        email: '',
        password: '12345',
        role: 'user'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('string')
          expect(res.body).include('please fill email')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users/register (if user register with an empty password)', function() {
    it('should return an object and status 500', function(done) {
      let user = {
        name: 'yoga',
        email: 'permana76.yp@gmail.com',
        password: '',
        role: 'user'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('string')
          expect(res.body).include('please fill password')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users/register (if user register with an empty roll)', function() {
    it('should return an object and status 500', function(done) {
      let user = {
        name: 'yoga',
        email: 'permana76.yp@gmail.com',
        password: '12345',
        role: ''
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('string')
          expect(res.body).to.include('please fill role')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users/login (if user login with a not registered email)', function() {
    it('should return an object and status 401', function(done) {
      let user = {
        email: 'permana76.yp@gmail.com',
        password: '12345'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .then(res => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('POST /users/login (if user login with wrong password)', function() {
    it('should return an object and status 401', function(done) {
      let user = {
        email: 'permana76.yp@gmail.com',
        password: '123'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .then(res => {
          expect(res).to.have.status(401)
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
