port = 2000
const http = require("http")
server = http.createServer((req,res)=>{
    res.writeHead(
            res.write("HelloWorld"),
        res.end()
        )
});
server.listen(port,()=>{
    console.log("working on port"+port)
})