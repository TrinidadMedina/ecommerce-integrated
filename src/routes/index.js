const { Router } = require('express');
const productRouter = require('./product/product.routes')

const router = Router();

router.get('/health', (_req, res) => {
    res.status(200).json({
        health: 'up',
        enviroment: process.env.ENVIROMENT || 'Undefined'
    });
})
.use('/', productRouter)

module.exports = router;