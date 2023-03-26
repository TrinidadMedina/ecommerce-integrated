const router = require('express').Router();
const passport = require('passport');

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/error'}), async (req, res) => {
    res.redirect('/home');
});

router.post('/', passport.authenticate('signin', {failureRedirect: '/error'}), async (req, res) => {
    res.redirect('/home');
});

router.get('/signout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    })
})

module.exports = router;