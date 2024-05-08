const mongoose = require('mongoose');

const feedbackOneSchema = new mongoose.Schema({
    name:{
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

const feedbackOne = mongoose.model('feedbackOne', feedbackOneSchema);

module.exports={
    feedbackOne
}