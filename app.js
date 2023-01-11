const express = require('express');
const logger = require('morgan');
const mongoDb = require('./src/db-config/mongo.config');
const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');

require('dotenv').config();

const app = express();

const connect = async () => {
    try{
        await mongoDb();
        console.info('mongoDB connected');
    }catch(err){
        console.error(err)
    }
};

connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

app.use('/', indexRouter);

app.use(errorHandler);

module.exports = app;