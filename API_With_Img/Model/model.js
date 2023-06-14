const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,"please fill your Name"],
        unique:true
    },
    Class:{
        type:String,
        required:[true,"please fill your Class"],
    },
    Age:{
        type:Number,
        required:[true,"please fill your Age"],
    },
    ProfilePicture:{
        type:String,
        required:[true,"please fill your Profile Picture"],
    },

},{timestamps:true})

const profileModel = mongoose.model("DATABASE",profileSchema)
module.exports = profileModel