const fs = require("fs")
const express = require("express")
const PORT = 3330

const app = express()
app.use( express.json())


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


//create new users
app.post("/users", (req,res)=>{
    const database = readDatabase()
    const newUser = req.body
    newUser.id = database.users.length + 1   
    database.users.push(newUser)
    writeDatabase(database)
    res.status(201).json({
        newData:newUser
    })    
})

// update users in the json
app.put("/users/:id",()=>{
    const database = readDatabase()
    const userId = parseInt(req.params.id)
    const updatedUser = req.body
    const index = database.users.findIndex((i)=>(i.id === userId))
    if (index !==-1){
        database.users[index] = {...database.users[index], ...updatedUser}
        writeDatabase(database)
        res.status(200).json({data:database.users[index]})
    } else {
        res.send("wrong id sent")
    }
})

app.delete("/users/:id",(req,res) => {
    const database = readDatabase()
    const userId  = parseInt(req.params.id)
    const index = database.users.findIndex((i)=>(i.id===userId))
    if (!index){
        res.status(404).json({message:"error"})
    } else {

        deletedUser =database.users[index]
        database.users.splice(index,1)
        writeDatabase(database)
        res.status(200).json({
            deletedData:deletedUser,
            message:"deleted"
    })}
})


app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})