require("./Config/config")
const express = require("express")
const mongoose = require("mongoose")
PORT = 5199


const app = express()
app.use(express.json())
const router = require("./Route/route")
app.use(router)
app.use(express.urlencoded({extended:true}))





app.listen(PORT, ()=>{
    console.log("App is listening to the PORT");
})