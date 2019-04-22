const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/register/admin', UserController.registerAdmin)
router.post('/login', UserController.login)
router.get('/', UserController.getAllUser)

module.exports = router