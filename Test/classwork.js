const fs = require("fs")
const express = require("express")
const PORT = 6000

const app = express()
app.use( express.json())

const fuelStation=[
    {id:2,name:"uche",address:"14a lekki bistro",salary:"300,000",position:"manager",gender:"male"},
    {id:4,name:"frances",address:"34b temitope street",salary:"150,000",position:"intern",gender:"female"},
    {id:5,name:"sad","address":"74 surulere","salary":"500,000","position":"cfo",gender:"female"},
    {name:"frances",address:"34b temitope street",salary:"150,000",position:"intern",gender:"female",id:6}
]



// sending a welcome message
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to my Fuel Station"})
})

// staff registration
app.post("/staff", (req,res)=>{
    const newStaff = req.body
    newStaff.id = fuelStation.length + 1   
    fuelStation.push(newStaff)
    res.status(201).json({
        newData:newStaff
    })    
})

// staff removal 
app.delete("/staff/:id",(req,res) => {
    const staffId  = parseInt(req.params.id)
    const staff = fuelStation.find((i)=>(i.id)===staffId)
    const index = fuelStation.findIndex((i)=>(i.id===staffId))
    if (!staff){
        res.status(404).json({message:"error"})
    } else {

        deletedStaff =fuelStation[index]
        fuelStation.splice(index,1)
        res.status(200).json({
            deletedData:deletedStaff,
            message:"deleted"
    })}
})


// // staff information update
app.put("/staff/:id",(req,res)=>{
    const staffId = parseInt(req.params.id)
    const updatedStaff = req.body
    const index = fuelStation.findIndex((i)=>(i.id === staffId))
    if (index !==-1){
        fuelStation[index] = {...fuelStation[index], ...updatedStaff}
        res.status(200).json({data:fuelStation[index]})
    } else {
        res.send("wrong id sent")
    }
})

// // identify a particular staff
app.get("/staff/:id",(req,res)=>{
    const staffId = parseInt(req.params.id)
    const staff = fuelStation.find((u)=>(u.id ===staffId))
    if(!staff){
        res.status(404).json({message:"user not found"})
    }else {
        res.status(200).json({status:staff})
    }
})

app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})