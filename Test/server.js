const fs = require("fs")
const express = require("express")
const PORT = 3030

const app = express()


// sending a welcome message
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to my Service"})
})

// read database
const readDatabase = (req,res) => {
    const Database = fs.readFileSync("./user.json")
    return JSON.parse(Database);
}


// write to database
const writeDatabase = (data) => {
    fs.writeFileSync("./user.json", JSON.stringify(data))
}
// getting all users
app.get("/users",(req,res) =>{
    const users = readDatabase();
    if(users.users.length === 0){
        res.status(404).json({message:"empty"})
    }
    else {
        res.status(200).json({message:"ok",
    message:"ok",
    data:users,
    size:users.users.length})
    }
})

app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})


// get one user
app.get("/users/:id",(req,res)=>{
    const database = readDatabase();
    const userId = parseInt(req.params.id)
    const user = database.users.find((u)=>(u.id ===userId))
    if(!user){
        res.status(404).json({message:"user not found"})
    }else {
        res.status(200).json({status:user})
    }
})