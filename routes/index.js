const express = require('express');
const routes = express.Router();
const {userRouter} = require('./userAuth');
const {feedbackOneRouter} = require('./feedbackOne');

routes.use('/user', userRouter);
routes.use('/feedbackone', feedbackOneRouter);


module.exports = {
    routes
}