const  http = require("http")
PORT = 4000
const {getAllTeams,getOneTeam} = require("../colinapi/Controller/controller.js")

const server = http.createServer((req,res)=>{
    if (req.url === "/firstOne" && req.method === "GET"){
        getAllTeams(req,res)
    }
    else if (req.url ==="/oneteam"){
        getOneTeam(req,res,"1")
    }
    else {res.end("Something went wrong")}
})

server.listen(PORT, ()=>{
    console.log("Server is running on port 4000")
})