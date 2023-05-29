const express = require("express")
const mongoose = require("mongoose")
PORT = 4500 

// create a database url
const databaseUrl = "mongodb://127.0.0.1/studentDB"

// create a database connection
mongoose.connect(databaseUrl).then(()=>{
    console.log("connected successfully to "+databaseUrl);
}).catch((error)=>{console.log(error.message)})

// create the application model
const studentSchema = mongoose.Schema({
    studentName : {
        type : String,
        required : (true,"student name is required")
    },
    studentCourse : {
        type : String,
        required : (true,"student course is required")
    },
    courseDuration : {
        type : Number,
        required : (true,"Course duration is required")
    }
})

// create the schema model 
const studentModel = mongoose.model("student", studentSchema)

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Welcome to my database"
    })
})

// create students
app.post("/students", async (req,res)=>{
    const student = await studentModel.create(req.body)
    try {
        if (!student){res.status(404).json({message:"error"})}
        else {res.status(200).json({data:student})}
    } catch (error) {
        console.log(error.message)
    } 
})

// get all student
app.get("/students", async(req,res)=>{
    try {
        const student = await studentModel.find()
        if (student.length<0){res.status(404).json({message : "no student with this id"})}
        else{res.status(200).json({data:student})}
    } catch (error) {
        console.log(error.message)
    }
})

// get one student
app.get("/students/:id",async (req,res)=>{
    try {
        const studentId = req.params.id
        const student = await studentModel.findById(studentId)
        if (!student){res.status(404).json({message:"not found"})}
        else {res.status(200).json({data:student})}
    } catch (error) {
        console.log(error.message)
    }

})

// update student
app.put("/students/:id",async (req,res)=>{
    try {
    const studentId = req.params.id
    const updatedStudent = await studentModel.findByIdAndUpdate(studentId, req.body)
    if(!student){res.status(404).json({message:"error"})}
    else {res.status(200).json({data:updatedStudent})}
    } catch (error) {
        console.log(error.message)
    }
})

// delete one student
app.delete("/students/:id", async (req,res)=>{
    try {
        const studentId = req.params.id
        const student = await studentModel.findByIdAndDelete(studentId)
        if(!student){res.status(404).json({message :"error"})}
        else {res.status(200).json({message:student})}
    } catch (error) {
        console.log(error.message)
    }
})
app.listen(PORT, ()=>{console.log(`Server is listening at ${PORT}`);})