require('./config/config')
const route = require('./routes/userRoute')
const express = require('express');
const app = express();
PORT = process.env.PORT || 1313

app.use(express.json());
app.use('/api', route)

app.listen(PORT, ()=>{
    console.log(`This App is listening on Port: ${PORT}`)
})