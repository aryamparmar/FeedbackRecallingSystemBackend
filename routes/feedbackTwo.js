const express = require('express');
const feedbackTwoRouter = express.Router();
const zod = require('zod');
const Feedback = require('../models/feedbackTwoModels.js');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
import validator from "validator";

const feedbackBody=zod.object({
    name:zod.string(),
    contact:zod.string().refine(validator.isMobilePhone),
    email:zod.string().email(),
    star:zod.number(),
    comments:zod.string()
})

const addFeedbackTwo = async(req, res) => {
    try{
        const {success} = feedbackBody.safeParse(req.body);
        if(!success){
            res.json({
                message:"Fill the form"
            })
            return
        }
    
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.userId;

        const {name, email, star, comments} = req.body;
    
        const feedbackCreated = await Feedback.create({
            userId,
            name,
            email,
            star, 
            comments
        })

        res.json({
            message:"Feedback added successfully",
            feedbackCreated,
            success:true
        })
        return
    }catch(error){
        res.json({
            message:error.message,
            success:false
        })
        return
    }
}

feedbackTwoRouter
    .route('/')
    .post(addFeedbackTwo)

module.exports = {
    feedbackTwoRouter
}    

