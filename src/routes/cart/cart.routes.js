const {Router} = require('express');
const {
  createCart,
  getCarts,
  getCart,
  insertProduct,
  deleteProduct,
  deleteCart
} = require ('../../controllers/cart.controllers');

const router = Router();

router
.post('/', createCart)
.get('/', getCarts)
.get('/:uuid', getCart)
.post('/:cartUuid/:productUuid', insertProduct)
.delete('/:cartUuid/:productUuid', deleteProduct)
.delete('/:uuid', deleteCart)

module.exports = router;