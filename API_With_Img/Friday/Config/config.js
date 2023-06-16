const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://chibuezeonyenze123:CDbScgMxDCuNRonX@cluster0.obausz9.mongodb.net/")
.then(()=>{console.log("Connected to the DB");})
.catch((error)=>{console.log(error.message)})



