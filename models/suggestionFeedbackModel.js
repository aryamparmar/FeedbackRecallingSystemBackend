const mongoose = require('mongoose');

const suggestionFeedbackSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    email: String,
    selectedOptions: [{
        type: String,
        enum: ['Compliment', 'Suggestion for improvement', 'Feedback', 'Confidential', 'Enquiry', 'Raised Before']
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