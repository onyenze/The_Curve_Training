const mongoose = require("mongoose")


const url = process.env.DB

mongoose.connect(url).then(()=>{console.log("Connected to the DB");}).catch((error)=>{console.log(error.message);})