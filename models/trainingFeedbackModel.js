const mongoose = require('mongoose');

const trainingFeedbackSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    whatEnjoyMost:{
        type:String,
        required:true,
        trim:true
    },
    keyLearning:{
        type:String,
        required:true
    },
    subjectMatter:{
        type:String,
        required:true,
        trim:true
    },
    mostValuable:{
        type:String,
        required:true,
        trim:true
    },
    trainerRate:{
        type:Number,
        required:true,
        trim:true
    },
    overallRate:{
        type:Number,
        required:true,
        trim:true
    },
    comments:{
        type:String,
        required:true,
        trim:true
    }
})

const trainingFeedback = mongoose.model('trainingFeedback', trainingFeedbackSchema);

module.exports={
    trainingFeedback
}