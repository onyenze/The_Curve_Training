const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://chibuezeonyenze123:m3KcW9sBrKP4608w@cluster0.p5vrv7a.mongodb.net/")
.then(()=>{console.log("Connected to the DB");})
.catch((error)=>{console.log(error.message)})