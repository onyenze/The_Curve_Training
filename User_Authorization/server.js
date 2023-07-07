const express = require("express")
const router = require(router)

const app = express()
const PORT = 9000
app.use(express.json())
app.get("/test",(req,res)=>{
    res.send("User Authorization")
})

app.use("/api", router)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})