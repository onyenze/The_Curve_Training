const mongoose = require('mongoose');

const resturantSchema = new mongoose.Schema({
    branch:{
        type:String,
        required:[true,"please fill your branch"],
    },
    address:{
        type:String,
        required:[true,"please fill your address"],
    },
     citizenMeal:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'food'
    }],
    refuelMax:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'food'
    }],
    chickWizz:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'food'
    }],
}, {timestamp: true})

const resturantModel = mongoose.model('resturant', resturantSchema)

module.exports = resturantModel