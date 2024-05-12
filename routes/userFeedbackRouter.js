const express = require('express');
const userFeedbackRouter = express.Router();
const zod = require('zod');
const { userFeedback } = require('../models/userFeedbackModel');

// Define schema for request body validation
const feedbackBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    environment: zod.enum(['Excellent', 'Good', 'Bad', 'Too Bad', 'Other']),
    experienceRating: zod.number().min(1).max(5),
    achievementDescription: zod.string(),
    country: zod.string(),
    state: zod.string().optional()
});

// Route handler to add user feedback
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
            firstName,
            lastName,
            email,
            environment,
            experienceRating,
            achievementDescription,
            country,
            state
        } = req.body;

        // Create user feedback document
        const feedbackRegister = await userFeedback.create({
            firstName,
            lastName,
            email,
            environment,
            experienceRating,
            achievementDescription,
            country,
            state
        });

        res.json({
            message: "User feedback added successfully",
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
        // Fetch all user feedback entries from the database
        const allFeedback = await userFeedback.find();

        res.json({
            message: "User feedback retrieved successfully",
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

// Define route for adding user feedback
userFeedbackRouter
    .route('/')
    .post(addFeedback)
    .get(readFeedback);

module.exports = {
    userFeedbackRouter
};
