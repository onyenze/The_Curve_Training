const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
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
        default:true
    },
    isSuperAdmin:{
        type:Boolean,
        default:false
    },
    islogin:{
        type:Boolean,
        default:false
    },
    record: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "score"
    },password:{
        type:String,
        required:true["password is required"]
    },
    token: {
        type: String
    }
},{timestamps:true})

const adminModel= mongoose.model("admin", adminSchema)

module.exports = adminModel