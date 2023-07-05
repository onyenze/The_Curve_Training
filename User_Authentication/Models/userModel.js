const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "email is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "email is required"]
    },
    token : {
        type: String
    }
}, {timestamps:true})

const userModel = mongoose.model("USERS", userSchema)
module.exports = userModel