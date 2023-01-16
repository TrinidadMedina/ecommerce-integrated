const router = require('express').Router();
const UserModel = require('../../services/mongo/models/user.model')
const md5 = require('md5');


router.post('/signup', async (req, res) => {
    const {fullName, username, password} = req.body;
    const findUser = await UserModel.findOne({username});
    if(findUser){
        return res.redirect('/error');
    }
    const newUser = new UserModel({
        fullName,
        username,
        password: md5(password)
    });
    const createUser = await newUser.save();
    if(!createUser){
        res.redirect('/error');
    }
    req.session.username = username;
    req.session.isAuth = true;
    res.redirect('/home');
});

router.post('/signin', async (req, res) => {
    let {username, password} = req.body;
    password = md5(password);
    const user = await UserModel.findOne({username, password});
    if(!user){
        return res.redirect('/error');
    }
    req.session.username = username;
    req.session.isAuth = true;
    res.redirect('/home');
});

router.get('/signout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.error(err.message);
            process.exit();
        }
        res.redirect('/signin')
    });
})

module.exports = router;