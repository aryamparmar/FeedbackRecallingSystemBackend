const mongoose = require('mongoose');

const suggestionFeedbackSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    email: String,
    selectedOptions: [{
        type: String,
        enum: ['This is a Compliment', 'This is a Suggestion for improvement']
    }],
    businessName: String,
    details: String,
    improvementAction: String,
    receiveResponse: {
        type: String,
        enum: ['Yes', 'No']
    }
})

const suggestionFeedback = mongoose.model('suggestionFeedback', suggestionFeedbackSchema);

module.exports={
    suggestionFeedback
}