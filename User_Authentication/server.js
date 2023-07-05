const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.configDotenv({path : "./Config/config.env"})
const app = require("./app")

const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log("Server is connected")
}).catch((err)=>{console.log(err.message);})