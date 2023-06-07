require("./config/dbConfig")
const express = require("express")
const hospitalRouter = require("./routers/hospitalRoute")
const PORT = 9000



const app = express()
app.use(express.json())
app.use("/api", hospitalRouter)

app.listen(PORT,()=>{
    console.log("Listening to the port");
})