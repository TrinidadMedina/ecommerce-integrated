const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const compression = require('compression');

const mongooseConnect = require('./src/services/mongo/connect');
const { getStoreConfig } = require('./src/services/session/session.config');
const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');

const UserModel = require('./src/services/mongo/models/user.model');

require('dotenv').config();

const app = express();

const COOKIES_SECRET = process.env.COOKIES_SECRET || 'default';

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

mongooseConnect();

app.use(cookieParser(COOKIES_SECRET));

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIES_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

app.set('views', './views');
app.set('view engine', 'ejs');

passport.use('signin', new LocalStrategy(async (username, password, done) => {
    const userData = await UserModel.findOne({username, password: md5(password)});
    if(!userData){
       return done(null, false);
    }
    done(null, userData)
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const userData = await UserModel.findOne({username, password: md5(password)});
    if(userData){
        return done(null, false);
    }
    const stageUser = new UserModel({
        username,
        password: md5(password),
        fullName: req.body.fullName
    });
    const newUser = await stageUser.save();
    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const userData = await UserModel.findById(id);
    done(null, userData);
});

app.use(passport.initialize());
app.use(passport.session())

app.use(indexRouter);

app.use(errorHandler);

module.exports = app;