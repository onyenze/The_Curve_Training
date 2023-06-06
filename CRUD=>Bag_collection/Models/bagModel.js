const mongoose = require("mongoose")
const schema = mongoose.Schema

const BagSchema = new schema({
    brandName:{
        type:String
    },
    color:{
        type:String
    },
    price:{
        type:Number
    }
})
const bagModel=mongoose.model("bagModel",BagSchema)

module.exports = bagModel