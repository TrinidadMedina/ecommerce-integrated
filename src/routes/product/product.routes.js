const {Router} = require('express');
const {
  createProduct,
  getProducts
} = require ('../../controllers/product.controllers');

const router = Router();

router
.post('/', createProduct)
.get('/', getProducts);

module.exports = router;