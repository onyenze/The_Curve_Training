require("./Config/config")
const router = require("./router/router")
const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

app.use(express.json())
app.use("/api", router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})