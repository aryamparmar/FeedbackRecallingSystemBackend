const express = require('express');
const productFeedbackRouter = express.Router();
const zod = require('zod');
const { productFeedback } = require('../models/productFeedbackModel');

// Define schema for request body validation
const feedbackBody = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    overallImpression: zod.number(),
    likeMost: zod.string(),
    improve: zod.string(),
    quality: zod.number(),
    innovate: zod.number(),
    honesty: zod.string(),
    valueForMoney: zod.number(),
    buyProduct: zod.string(),
    replace: zod.number(),
    recommend: zod.string(),
    reason: zod.string()
});

// Route handler to add product feedback
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
            name,
            email,
            overallImpression,
            likeMost,
            improve,
            quality,
            innovate,
            honesty,
            valueForMoney,
            buyProduct,
            replace,
            recommend,
            reason
        } = req.body;

        // Create product feedback document
        const feedbackRegister = await productFeedback.create({
            name,
            email,
            overallImpression,
            likeMost,
            improve,
            quality,
            innovate,
            honesty,
            valueForMoney,
            buyProduct,
            replace,
            recommend,
            reason
        });

        res.json({
            message: "Product feedback added successfully",
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
        // Fetch all product feedback entries from the database
        const allFeedback = await productFeedback.find();

        res.json({
            message: "Product feedback retrieved successfully",
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

// Define route for adding product feedback
productFeedbackRouter
    .route('/')
    .post(addFeedback)
    .get(readFeedback);


module.exports = {
    productFeedbackRouter
};
