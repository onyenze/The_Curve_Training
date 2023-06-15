const mongoose = require("mongoose")

const imageSchema =  new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    course: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    }
}, { timestamps: true })

const imageModel = mongoose.model("DATABASE",imageSchema)

module.exports=imageModel

