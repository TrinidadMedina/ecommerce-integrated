const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');

const mongooseConnect = require('./src/services/mongo/connect');
const { getStoreConfig } = require('./src/services/session/session.config');
const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');

require('dotenv').config();

const app = express();

const COOKIES_SECRET = process.env.COOKIES_SECRET || 'default';

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

app.use(indexRouter);

app.use(errorHandler);

module.exports = app;