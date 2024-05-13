const express = require('express');
const suggestionFeedbackRouter = express.Router();
const zod = require('zod');
const {suggestionFeedback} = require('../models/suggestionFeedbackModel.js');

const feedbackBody = zod.object({
    name: zod.object({
        firstName: zod.string(),
        lastName: zod.string()
    }),
    email: zod.string().email(),
    selectedOptions: zod.array(zod.enum(['This is a Compliment', 'This is a Suggestion for improvement'])),
    businessName: zod.string(),
    details: zod.string(),
    improvementAction: zod.string(),
    receiveResponse: zod.enum(['Yes', 'No'])
});

const addFeedback = async (req, res) => {
    try {
        const { success } = feedbackBody.safeParse(req.body);
        if (!success) {
            res.json({
                message: "Fill the form"
            });
            return;
        }

        const { name, email, selectedOptions, businessName, details, improvementAction, receiveResponse } = req.body;
        // console.log(req.body)
        const feedbackRegister = await suggestionFeedback.create({
            name,
            email,
            selectedOptions,
            businessName,
            details,
            improvementAction,
            receiveResponse
        });
        
        // console.log("aryam")
        res.json({
            message: "Feedback added successfully",
            feedbackRegister,
            success: true
        });
        return;
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        });
        return;
    }
};

const readFeedback = async (req, res) => {
    try {
        // Fetch all suggestion feedback entries from the database
        const allFeedback = await suggestionFeedback.find();

        res.json({
            message: "Suggestion feedback retrieved successfully",
            feedbackEntries: allFeedback,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

suggestionFeedbackRouter
    .route('/')
    .post(addFeedback)
    .get(readFeedback);

module.exports = {
    suggestionFeedbackRouter
};
