const mongoose = require("mongoose")


const RestSchema = new mongoose.Schema({
    branch:{
        type:String,
        required:[true,"please fill your branch"],
        unique:true
    },
    citizenMeal:{
        type:Object
    },
    refuelMax:{
        type:Object
    },
    refuel:{
        type:Object
    },
    chickWizz:{
        type:Object
    },
    bigBoyzMeal:{
        type:Object
    }
},{timestamps:true})

const restModel = mongoose.model("restuarant",RestSchema)
module.exports = restModel