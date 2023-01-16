const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/signin', (req, res) => {
    if(req.session.isAuth){
        return res.redirect('/home')
    }
    res.render('signin');
});

router.get('/signup', (req, res) => {
    if(req.session.isAuth){
        return res.redirect('/home')
    }
    res.render('signup');
});

router.get('/error', (_req, res) => {
    res.render('error');
});

router.get('/home', authMiddleware, (_req, res) => {
    res.render('home')
})

module.exports = router;