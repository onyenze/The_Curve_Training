const totalTeams = require("./footballController/footballController")
// const allTeams = require("./footballModel/footballModel")
const http = require("http")
port =5000
server = http.createServer(async (req,res)=>{
    
const result = await totalTeams()
if(req.url==="/"){
    res.write("hello")
    res.end()}
else if (req.url==="/allTeams"){
    res.writeHead(200,{"content-type":"application/json"})
    res.end(JSON.stringify(result))
}
else {res.end("page not found")}
})

server.listen(port,()=>{console.log("working port"+port)})