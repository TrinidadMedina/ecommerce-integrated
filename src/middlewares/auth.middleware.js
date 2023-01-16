const authMiddleware = (req, res, next) => {
    if(!req.session.username && !req.session.isAuth){
        return res.redirect('/signin');
    }
    next();
};

module.exports = authMiddleware;