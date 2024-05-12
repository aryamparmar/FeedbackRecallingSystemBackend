const mongoose = require('mongoose');

const userFeedbackSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    environment: {
        type: String,
        enum: ['Excellent', 'Good', 'Bad', 'Too Bad', 'Other'],
        required: true
    },
    experienceRating: {
        type: Number,
        min: 1,
        max: 5
    },
    achievementDescription: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String
    }
})

const userFeedback = mongoose.model('userFeedback', userFeedbackSchema);

module.exports={
    userFeedback
}