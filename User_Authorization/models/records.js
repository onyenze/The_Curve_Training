const mongoose = require("mongoose")

const recordSchema = new mongoose.Schema({
    math:{
        type:String,
        required:true["score is required"]
    },
    english:{
        type:String,
        required:true["score is required"]
    }
},{timestamps:true})

const recordModel= mongoose.model("score", recordSchema)

module.exports = recordModel