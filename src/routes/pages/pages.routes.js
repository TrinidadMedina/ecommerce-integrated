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
    try{
        const userData = req.user;
        const data = await productServices.getProducts();
        res.render('home', {options: data, fullname: userData.username});
    }catch(err){
        console.error(err);
        res.render('/');
    }
});

router.get('/cart', async (req, res) => {
    try{
        const userData = req.user;
        const data = await cartServices.getCarts(userData._id);
        res.render('cart', {options: data, fullname: userData.username});
    }catch(err){
        console.error(err);
        res.render('/');
    }
});

module.exports = router;