const mongoose = require('mongoose');

const referencedSchema = new mongoose.Schema({
  
    refuelMax:{
        type: Object
   },
   citizenMeal:{
    type: Object
   },
   chickWizz:{
    type: Object
   },
   link: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'resturant'
   }
}, {timestamp: true})

const referencedModel = mongoose.model('food', referencedSchema)

module.exports = referencedModel