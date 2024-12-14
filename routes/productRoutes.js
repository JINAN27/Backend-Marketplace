const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', [auth, upload.single('pd_image')], createProduct);
router.get('/', getProducts);
router.put('/:id', [auth, upload.single('pd_image')], updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;

