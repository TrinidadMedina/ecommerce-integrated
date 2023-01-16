const router = require('express').Router();
const pagesRouter = require('./pages/pages.routes');
const sessionRouter = require('./session/session.routes');
const cartRouter = require('./cart/cart.routes');
const productRoutes = require('./product/product.routes');

router.get('/health', (_req, res) => {
    res.status(200).json({
        health: 'up',
        enviroment: process.env.ENVIROMENT || 'Undefined'
    });
})
.use(pagesRouter)
.use(sessionRouter)
.use('/carts', cartRouter)
.use('/products', productRoutes);


module.exports = router;