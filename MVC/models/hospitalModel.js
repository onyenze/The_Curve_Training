const mongoose = require("mongoose")

const hospitalSchema= mongoose.Schema({
    name:String,
    address:String,
    medicalHistory:String,
    phone:String,
    bloodGroup:String,
    gender:String
}, {timestamps:true})

const hospitalModel = mongoose.model("Hospital", hospitalSchema)

module.exports=hospitalModel