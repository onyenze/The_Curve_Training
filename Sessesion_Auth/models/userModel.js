const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    name:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    password:{type:String,required:true}
})

const festac = mongoose.model("Users", userSchema)

module.exports = festac