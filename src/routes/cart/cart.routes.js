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
.post('/insert', insertProduct)
.post('/delete', deleteProduct)
.delete('/:uuid', deleteCart)

module.exports = router;