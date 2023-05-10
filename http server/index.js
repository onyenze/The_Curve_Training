const fs = require("fs")
const http = require("http")

server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"html"})
    fs.readFile("./web.html",(err,data)=>{
        res.write(data)
        res.end()
    })
})
server.listen(3000, console.log("this is a working port"))
