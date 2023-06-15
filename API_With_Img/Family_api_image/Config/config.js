const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://chibuezeonyenze123:D5o4uTkvRu6k6flx@cluster0.t9rheir.mongodb.net/")
.then(()=>{console.log("Your database is connected");})
.catch((error)=>{console.log(error.message)})

