const fs = require("fs")
const http = require("http")
const express = require("express")
app = express()
server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"html"})
    fs.readFile("./web.html",(err,data)=>{
        res.write(data)
        res.end()
    })
})
server.listen(3000, console.log("this is a working port"))

// app.get("/admin",(req,res)=>{
//     res.send(console.log("bla bla"))
// })

server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"text"})
    fs.readFile("what's up",(err,data)=>{
        res.write(data)
        res.end()
    })
})
server.listen(3000, console.log("this is ing port"))