const express = require("express")
const mongoose = require("mongoose")
 const PORT = 5677

 const app = express()
 app.use(express.json())

const electionSchema = mongoose.Schema({
    state: String,
    parties: Array,
    result: Object,
    colationOfficer: String,
    isRigged: Boolean,
    totalLg: Number
})

const electionModel = mongoose.model("Presidential Election", electionSchema)

app.get("/",(req,res)=>{
    res.send("Welcome to my Election API")
})

app.post("/create",async (req,res)=>{try {
    const newEntry = await electionModel.create(req.body)
    res.status(200).json({data:newEntry})

} catch (error) {
    console.log(error.message)
}
    
})










 app.listen(PORT,()=>{console.log("working on some port")})
 mongoose.connect("mongodb+srv://chibuezeonyenze123:jzwWbLsC87KcZwjd@cluster0.3w8at1x.mongodb.net/").then(()=>{console.log("working as well")})