const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please fill your Name"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please fill your Class"],
    },
    message:{
        type:String,
        required:[true,"please fill your Age"],
    },
    ProfilePicture:{
        cloud_id:{type:String},
        cloud_url:{type:String},
        // required:[true,"please fill your Profile Picture"],
    },

},{timestamps:true})

const profileModel = mongoose.model("DATABASE",profileSchema)
module.exports = profileModel