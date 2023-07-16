const mongoose = require("mongoose")
require('dotenv').config()
DB = process.env.DATABASE
mongoose.connect(DB).then(()=>{console.log("Database is Connected")}).catch((err)=>{console.log(err.message);})