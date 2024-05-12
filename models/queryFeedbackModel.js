const mongoose = require('mongoose');

const querySchemaFeedback = new mongoose.Schema({
    name: String,
    email: String,
    query: String
})

const querySchema = mongoose.model('querySchema', querySchemaFeedback);

module.exports={
    querySchema
}