const fs = require("fs")
const express = require("express")
const PORT = 8200

const app = express()
app.use( express.json())

const staffs = [
    {id : 1, name:"Bimbo",age:25,Department:"Human Resources"},
    {id : 2, name:"Kelvin",age:35,Department:"Audit"}
]

// sending a welcome message
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to my Management System"})
})

// staff registration
app.post("/database", (req,res)=>{
    const newStaff = req.body
    newStaff.id = staffs.length + 1   
    staffs.push(newStaff)
    res.status(201).json({
        Data:newStaff
    })    
})

// identify a particular staff
app.get("/database/:id",(req,res)=>{
    const staffId = parseInt(req.params.id)
    const staff = staffs.find((u)=>(u.id ===staffId))
    if(!staff){
        res.status(404).json({message:"Staff not found"})
    }else {
        res.status(200).json({status:staff})
    }
})

// staff information update
app.put("/database/:id",(req,res)=>{
    const staffId = parseInt(req.params.id)
    const updatedStaff = req.body
    const index = staffs.findIndex((i)=>(i.id === staffId))
    if (index !==-1){
        staffs[index] = {...staffs[index], ...updatedStaff}
        res.status(200).json({data:staffs[index]})
    } else {
        res.send("wrong id sent")
    }
})

// staff removal 
app.delete("/database/:id",(req,res) => {
    const staffId  = parseInt(req.params.id)
    const staff = staffs.find((i)=>(i.id)===staffId)
    const index = staffs.findIndex((i)=>(i.id===staffId))
    if (!staff){
        res.status(404).json({message:"error"})
    } else {

        deletedStaff =staffs[index]
        staffs.splice(index,1)
        res.status(200).json({
            deletedData:deletedStaff,
            message:"deleted"
    })}
})


app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})