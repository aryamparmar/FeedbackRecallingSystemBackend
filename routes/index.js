const express = require('express');
const routes = express.Router();
const {userRouter} = require('./userAuth');
const {adminRouter} = require('./adminAuth');
const {userFeedbackRouter} = require('./userFeedbackRouter');
const {trainingFeedbackRouter} = require('./trainingFeedbackRouter');
const {suggestionFeedbackRouter} = require('./suggestionFeedbackRouter');
const {sessionFeedbackRouter} = require('./sessionFeedbackRouter');
const {queryFeedbackRouter} = require('./queryFeedbackRouter');
const {productFeedbackRouter} = require('./productFeedbackRouter');

routes.use('/authuser', userRouter);
routes.use('/authadmin', adminRouter);
routes.use('/product', productFeedbackRouter);
routes.use('/user', userFeedbackRouter);
routes.use('/training', trainingFeedbackRouter);
routes.use('/session', sessionFeedbackRouter);
routes.use('/suggestion', suggestionFeedbackRouter);
routes.use('/query', queryFeedbackRouter);


module.exports = {
    routes
}