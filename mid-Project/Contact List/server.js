const fs = require("fs")
const express = require("express")
const PORT = 8300

const app = express()
app.use( express.json())

const contacts = [
    {id:1,name:"Wizzy",address:"28a ilupeju street",tel:223454},
    {id:1,name:"Davido",address:"28a Banana close",tel:226774}
]

// sending a welcome message
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to my Contact List"})
})

// contact registration
app.post("/contacts", (req,res)=>{
    const newContact = req.body
    newContact.id = contacts.length + 1   
    contacts.push(newContact)
    res.status(201).json({
        Data:newContact
    })    
})

// identify a particular contact
app.get("/contacts/:id",(req,res)=>{
    const contactId = parseInt(req.params.id)
    const contact = contacts.find((u)=>(u.id ===contactId))
    if(!contact){
        res.status(404).json({message:"contact not found"})
    }else {
        res.status(200).json({status:contact})
    }
})

// contacts information update
app.put("/contacts/:id",(req,res)=>{
    const contactId = parseInt(req.params.id)
    const updatedContact = req.body
    const index = contacts.findIndex((i)=>(i.id === contactId))
    if (index !==-1){
        contacts[index] = {...contacts[index], ...updatedContact}
        res.status(200).json({data:contacts[index]})
    } else {
        res.send("wrong id sent")
    }
})

// contacts removal 
app.delete("/contacts/:id",(req,res) => {
    const contactId  = parseInt(req.params.id)
    const contact = contacts.find((i)=>(i.id)===contactId)
    const index = contacts.findIndex((i)=>(i.id===contactId))
    if (!contact){
        res.status(404).json({message:"error"})
    } else {

        deletedContact =contacts[index]
        contacts.splice(index,1)
        res.status(200).json({
            deletedData:deletedContact,
            message:"deleted"
    })}
})


app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})