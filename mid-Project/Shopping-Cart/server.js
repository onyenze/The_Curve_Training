const fs = require("fs")
const express = require("express")
const PORT = 8100

const app = express()
app.use( express.json())

const shoppingCart = [
    {id:1,item:"oranges",price:"3000",weight:"200g"},
    {id:2,item:"apple",price:"1500",weight:"50g"},
]

// sending a welcome message
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to my Shopping cart"})
})

// cart registration
app.post("/cart", (req,res)=>{
    const newItem = req.body
    newItem.id = shoppingCart.length + 1   
    shoppingCart.push(newItem)
    res.status(201).json({
        Data:newItem
    })    
})

// identify a particular item
app.get("/cart/:id",(req,res)=>{
    const itemId = parseInt(req.params.id)
    const item = shoppingCart.find((u)=>(u.id ===itemId))
    if(!item){
        res.status(404).json({message:"item not found"})
    }else {
        res.status(200).json({status:item})
    }
})

// cart information update
app.put("/cart/:id",(req,res)=>{
    const itemId = parseInt(req.params.id)
    const updatedItem = req.body
    const index = shoppingCart.findIndex((i)=>(i.id === itemId))
    if (index !==-1){
        shoppingCart[index] = {...shoppingCart[index], ...updatedItem}
        res.status(200).json({data:shoppingCart[index]})
    } else {
        res.send("wrong id sent")
    }
})

// item removal 
app.delete("/cart/:id",(req,res) => {
    const itemId  = parseInt(req.params.id)
    const item = shoppingCart.find((i)=>(i.id)===itemId)
    const index = shoppingCart.findIndex((i)=>(i.id===itemId))
    if (!item){
        res.status(404).json({message:"error"})
    } else {

        deletedItem =shoppingCart[index]
        shoppingCart.splice(index,1)
        res.status(200).json({
            deletedData:deletedItem,
            message:"deleted"
    })}
})


app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})