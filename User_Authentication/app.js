const express = require("express")
const router = require("./Routers/router")
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 2021

app.use("/api",router)

app.listen(PORT,()=>{console.log("Server is Connected");})

module.exports = app