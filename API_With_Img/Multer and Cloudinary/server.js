require("./config/dbConfig")
const express = require("express")
const app = express()

const PORT = 1010
app.use(express.json())
const router = require("./route/route")
app.use("/uploads", express.static("uploads"))

app.use("/api",router)

app.listen(PORT, ()=>{console.log("Listening to the port");})