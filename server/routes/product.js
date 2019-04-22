const router = require('express').Router()
const productController = require('../controllers/productController')
const { authenticate } = require('../middlewares/authenticate')
const { authorization } = require('../middlewares/authorization')

const Multer = require('multer') // npm install multer
const gcsMiddlewares = require('../middlewares/sendUploadToGCS')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
})

router.get('/', productController.getAllProduct)
router.post('/', multer.single('image'), gcsMiddlewares.sendUploadToGCS, productController.addProduct)
router.get('/:id', authenticate, productController.findOneProduct)
router.delete('/:id', authenticate, authorization, productController.deleteProduct)
router.put('/:id', authenticate, authorization, productController.updateProduct)

module.exports = router