const express = require("express")
const dotenv = require("dotenv")
dotenv.config({path: "./Config/config.env"})
const route = require("./Routers/bagRouter")

const app = express()
app.use(express.json())

app.use("/api", route)

module.exports = app