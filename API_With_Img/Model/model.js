const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please fill your Name"],
        unique:true
    },
    class:{
        type:String,
        required:[true,"please fill your Class"],
    },
    age:{
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