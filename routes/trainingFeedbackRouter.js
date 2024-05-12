const express = require('express');
const trainingFeedbackRouter = express.Router();
const zod = require('zod');
const { trainingFeedback } = require('../models/trainingFeedbackModel');

// Define schema for request body validation
const feedbackBody = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email(),
    whatEnjoyMost: zod.string(),
    keyLearning: zod.string(),
    subjectMatter: zod.string(),
    mostValuable: zod.string(),
    trainerRate: zod.number(),
    overallRate: zod.number(),
    comments: zod.string()
});

// Route handler to add training feedback
const addFeedback = async (req, res) => {
    try {
        // Validate request body
        const { success } = feedbackBody.safeParse(req.body);
        if (!success) {
            res.json({
                message: "Invalid request body"
            });
            return;
        }

        // Extract validated fields from request body
        const {
            firstname,
            lastname,
            email,
            whatEnjoyMost,
            keyLearning,
            subjectMatter,
            mostValuable,
            trainerRate,
            overallRate,
            comments
        } = req.body;

        // Create training feedback document
        const feedbackRegister = await trainingFeedback.create({
            firstname,
            lastname,
            email,
            whatEnjoyMost,
            keyLearning,
            subjectMatter,
            mostValuable,
            trainerRate,
            overallRate,
            comments
        });

        res.json({
            message: "Training feedback added successfully",
            feedbackRegister,
            success: true
        });
    } catch (error) {
            res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

const readFeedback = async (req, res) => {
    try {
        // Fetch all training feedback entries from the database
        const allFeedback = await trainingFeedback.find();

        res.json({
            message: "Training feedback retrieved successfully",
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

// Define route for adding training feedback
trainingFeedbackRouter
    .route('/')
    .post(addFeedback)
    .get(readFeedback);

module.exports = {
    trainingFeedbackRouter
};
