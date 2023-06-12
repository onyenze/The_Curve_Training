const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://chibuezeonyenze123:jlhxJVnS5JvoRTbD@cluster0.hzob1um.mongodb.net/")
.then(()=>{console.log("Connected to the DB");})
.catch((error)=>{console.log(error.message)})

