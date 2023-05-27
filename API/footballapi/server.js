const {totalTeams, singleTeam} = require("./footballController/footballController")
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
    res.end(JSON.stringify(result))}
else if (req.url.match(/\/singleTeam\/([0-9]+)/) && req.method == "GET"){
    const id = req.url.split("/"[2])
    singleTeam(req,res,id)
}

else {res.end("page not found")}
})

server.listen(port,()=>{console.log("working port"+port)})