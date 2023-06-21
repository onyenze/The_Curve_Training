// require("dotenv").config
const mongoose = require("mongoose")


const url = "mongodb+srv://chibuezeonyenze123:KhAmhwvAReXAWge0@cluster0.zyrrc6w.mongodb.net/"

mongoose.connect(url).then(()=>{
    console.log("Connected to the DB")
}).catch((error)=>{
    console.log(error.message);
})