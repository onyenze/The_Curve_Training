const {readAll, readOne} = require("../Model/model")


const getAllTeams = async (req,res)=>{
    try {
        const teams = await readAll()
        if(!teams[0]){res.end("No teams has been registered")}
        else{res.end(JSON.stringify(teams))}
    } catch (error) {console.log(error.message)}
}

const getOneTeam = async (req,res,id)=>{
    try{
        const team = await readOne(id)
        if (!team){res.end("no team found")}
        else{res.end(JSON.stringify(team))}
    }
    catch(error){console.log(error.message)}
}

module.exports = {getAllTeams,getOneTeam}