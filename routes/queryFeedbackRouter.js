const express = require('express');
const queryFeedbackRouter = express.Router();
const zod = require('zod');
const {querySchema} = require('../models/queryFeedbackModel.js');

const feedbackBody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    query: zod.string()
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

        const { name, email, query } = req.body;

        const feedbackRegister = await querySchema.create({
            name,
            email,
            query
        });

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
        // Fetch all query feedback entries from the database
        const allFeedback = await querySchema.find();

        res.json({
            message: "Query feedback retrieved successfully",
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

queryFeedbackRouter
    .route('/')
    .post(addFeedback)
    .get(readFeedback);

module.exports = {
    queryFeedbackRouter
};
