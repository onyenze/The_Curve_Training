require('dotenv').config();
const mongoose = require('mongoose');

const url = "mongodb+srv://chibuezeonyenze123:Vpah4SYF7z2u1RkL@cluster0.cjaza3w.mongodb.net/"
mongoose.connect(url).then(()=>{
    console.log('Connected to database')
}).catch(()=>{
    console.log('Could not connect to database')
})