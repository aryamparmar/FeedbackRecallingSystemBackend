const mongoose = require('mongoose');

const feedbackTwoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    contact:{
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
    star:{
        type:Number,
        required:true,
        trim:true
    },
    comments:{
        type:String,
        required:true
    }
})

const feedbackTwo = mongoose.model('feedbackOne', feedbackTwoSchema);

module.exports={
    feedbackTwo
}