const mongoose = require ("mongoose")

const personSchema = new mongoose.Schema({
    personName : {
        type : String,
        required : true
    },
    personPhone : {
        type : String,
        required : true
    }, 
    personProfile : {
        type : String,
        required : true
    }
})

const personModel = mongoose.model("profile",personSchema)

module.exports = personModel