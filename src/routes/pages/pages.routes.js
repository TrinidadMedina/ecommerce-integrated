const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const productServices = require('../../services/product/product.services');
const cartServices = require('../../services/cart/cart.services')


router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('signin');
});

router.get('/signup', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    res.render('signup');
});

router.get('/error', (_req, res) => {
    res.render('error');
});

router.get('/home', authMiddleware, async (req, res) => {
    const userData = req.user
    const data = await productServices.getProducts();
    res.render('home', {options: data, fullname: userData.fullName});
});

router.get('/cart', async (_req, res) => {
    const data = await cartServices.getCarts();
    res.render('cart', {options: data});
});

module.exports = router;