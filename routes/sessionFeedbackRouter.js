const express = require('express');
const sessionFeedbackRouter = express.Router();
const zod = require('zod');
const { sessionFeedback } = require('../models/sessionFeedbackModel.js');

// Define schema for request body validation
const feedbackBody = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    email: zod.string().email(),
    courseTitle: zod.string(),
    instructorName: zod.string(),
    presentation: zod.object({
        wellOrganized: zod.number(),
        lengthAndTime: zod.number(),
        format: zod.number(),
        clearAndUnderstandable: zod.number(),
        handouts: zod.number(),
        attendingSession: zod.number(),
        libraryResources: zod.number(),
    }),
    overallRate: zod.number(),
    subjectClear: zod.string(),
    subjectNotClear: zod.number(),
    meetExpectation: zod.string(),
    suggestion: zod.string(),
    presenter: zod.object({
        wellOrganized: zod.number(),
        clearPresented: zod.number(),
        knowledgeable: zod.number(),
        clarifyingIssue: zod.number(),
        encourageStudent: zod.number(),
        communicationSkill: zod.number(),
    }),
    presenterRate: zod.number()
});

// Route handler to add session feedback
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
            courseTitle,
            instructorName,
            presentation,
            overallRate,
            subjectClear,
            subjectNotClear,
            meetExpectation,
            suggestion,
            presenter,
            presenterRate
        } = req.body;

        // Create session feedback document
        const feedbackRegister = await sessionFeedback.create({
            firstname,
            lastname,
            email,
            courseTitle,
            instructorName,
            presentation,
            overallRate,
            subjectClear,
            subjectNotClear,
            meetExpectation,
            suggestion,
            presenter,
            presenterRate
        });

        res.json({
            message: "Session feedback added successfully",
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
        // Fetch all session feedback entries from the database
        const allFeedback = await sessionFeedback.find();

        res.json({
            message: "Session feedback retrieved successfully",
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


// Define route for adding session feedback
sessionFeedbackRouter
    .route('/')
    .post(addFeedback)
    .get(readFeedback);

module.exports = {
    sessionFeedbackRouter
};
