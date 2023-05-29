const fs = require("fs")
const express = require("express")
const PORT = 8400

const app = express()
app.use( express.json())

const blogPost = [
    {id:1,topic:"Entertainment",author:"James Bond"},
    {id:2,topic:"Politics",author:"Shina Rambo"}
]

// sending a welcome message
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to my Blog"})
})

// POST registration
app.post("/blog", (req,res)=>{
    const newPost = req.body
    newPost.id = blogPost.length + 1   
    blogPost.push(newPost)
    res.status(201).json({
        Data:newPost
    })    
})

// identify a particular Post
app.get("/blog/:id",(req,res)=>{
    const postId = parseInt(req.params.id)
    const post = blogPost.find((u)=>(u.id ===postId))
    if(!post){
        res.status(404).json({message:"Post not found"})
    }else {
        res.status(200).json({status:post})
    }
})

// Post information update
app.put("/blog/:id",(req,res)=>{
    const postId = parseInt(req.params.id)
    const updatedPost = req.body
    const index = blogPost.findIndex((i)=>(i.id === postId))
    if (index !==-1){
        blogPost[index] = {...blogPost[index], ...updatedPost}
        res.status(200).json({data:blogPost[index]})
    } else {
        res.send("wrong id sent")
    }
})

// Post removal 
app.delete("/blog/:id",(req,res) => {
    const postId  = parseInt(req.params.id)
    const post = blogPost.find((i)=>(i.id)===postId)
    const index = blogPost.findIndex((i)=>(i.id===postId))
    if (!post){
        res.status(404).json({message:"error"})
    } else {

        deletedPost =blogPost[index]
        blogPost.splice(index,1)
        res.status(200).json({
            deletedData:deletedPost,
            message:"deleted"
    })}
})


app.listen(PORT, () =>{
    console.log(`app is listening to server on ${PORT}`)
})