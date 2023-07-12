const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true["Username is required"]
    },
    email:{
        type:String,
        required:true["email is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isSuperAdmin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true["password is required"]
    },
    token: {
        type: String
    }
},{timestamps:true})

const userModel= mongoose.model("Users", userSchema)

module.exports = userModel