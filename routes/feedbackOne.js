const express = require('express');
const feedbackOneRouter = express.Router();
const zod = require('zod');
const Feedback = require('../models/feedbackOneModels.js');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const feedbackBody=zod.object({
    name:zod.string(),
    email:zod.string().email(),
    star:zod.number(),
    comments:zod.string()
})


const addFeedbackOne = async(req, res) => {
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
    
        const feedbackRegister = await Feedback.create({
            userId,
            name,
            email,
            star,
            comments
        })

        res.json({
            message:"Feedback added successfully",
            feedbackRegister,
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

feedbackOneRouter
    .route('/')
    .post(addFeedbackOne)

module.exports = {
    feedbackOneRouter
}    

