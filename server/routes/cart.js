const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { authenticate } = require('../middlewares/authenticate')

// router.use(authenticate)

router.post('/', authenticate, cartController.addCart)
router.get('/:id', authenticate, cartController.findAllCart)
router.delete('/:id', authenticate, cartController.deleteCart)

module.exports = router