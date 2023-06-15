const mongoose = require("mongoose")

const familySchema =  new mongoose.Schema({
    fatherName: {
        type: String,
        require: true
    },
    motherName: {
        type: String,
        required: true
    },
    childrenName: {
        type: Array,
        required: true
    },
    childrenImages:{
        type: Array,
        required: true
    }
}, { timestamps: true })

const familyModel = mongoose.model("DATABASE",familySchema)

module.exports=familyModel

