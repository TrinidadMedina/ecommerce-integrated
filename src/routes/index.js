const router = require('express').Router();
const pagesRouter = require('./pages/pages.routes');
const sessionRouter = require('./session/session.routes');
const cartRouter = require('./cart/cart.routes');
const productRouter = require('./product/product.routes');
const infoRouter = require('./info/info.routes');
const randomRouter = require('./random/random.routes')

router.get('/health', (_req, res) => {
    res.status(200).json({
        health: 'up',
        enviroment: process.env.VITE_ENVIROMENT || 'Undefined'
    });
})
.use(pagesRouter)
.use(sessionRouter)
.use('/carts', cartRouter)
.use('/products', productRouter)
.use('/info', infoRouter)
.use('/api', randomRouter);

module.exports = router;