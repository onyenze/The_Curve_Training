require("./Config/dbconfig")
const express = require("express")
const mongoose = require("mongoose")
PORT = 4199


const app = express()
app.use(express.json())
const router = require("./Routes/routes")
app.use(router)





app.listen(PORT, ()=>{
    console.log("App is listening to the PORT");
})