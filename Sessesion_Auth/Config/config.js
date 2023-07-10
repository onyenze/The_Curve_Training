require("dotenv").config()
const mongoose = require("mongoose")

DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{console.log("Connected to DB");})
                    .catch((error)=>{console.log(error.message);})
