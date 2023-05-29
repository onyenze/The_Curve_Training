const fs = require("fs")
const express = require("express")
const PORT = 8000

const app = express()
app.use( express.json())

const toDoListDB = [
    {id:1,task:"Work Out",status:"Completed",duration:"3 hours"},
    {id:2,task:"Laundry",status:"Incomplete",duration:"2 hours"},
    {id:3,task:"cook",status:"Completed",duration:"2 hours"}
]

// sending a welcome message
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to my To do List"})
})

// task registration
app.post("/toDo", (req,res)=>{
    const newTask = req.body
    newTask.id = toDoListDB.length + 1   
    toDoListDB.push(newTask)
    res.status(201).json({
        Data:newTask
    })    
})

// identify a particular task
app.get("/toDo/:id",(req,res)=>{
    const taskId = parseInt(req.params.id)
    const task = toDoListDB.find((u)=>(u.id ===taskId))
    if(!task){
        res.status(404).json({message:"Task not found"})
    }else {
        res.status(200).json({status:task})
    }
})

// task information update
app.put("/toDo/:id",(req,res)=>{
    const taskId = parseInt(req.params.id)
    const updatedTask = req.body
    const index = toDoListDB.findIndex((i)=>(i.id === taskId))
    if (index !==-1){
        toDoListDB[index] = {...toDoListDB[index], ...updatedTask}
        res.status(200).json({data:toDoListDB[index]})
    } else {
        res.send("wrong id sent")
    }
})

// staff removal 
app.delete("/toDo/:id",(req,res) => {
    const taskId  = parseInt(req.params.id)
    const task = toDoListDB.find((i)=>(i.id)===taskId)
    const index = toDoListDB.findIndex((i)=>(i.id===taskId))
    if (!task){
        res.status(404).json({message:"error"})
    } else {

        deletedTask =toDoListDB[index]
        toDoListDB.splice(index,1)
        res.status(200).json({
            deletedData:deletedTask,
            message:"deleted"
    })}
})


app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})