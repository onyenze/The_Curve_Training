const {allTeams, getOneTeam} = require("../footballModel/footballModel")

// to get all the teams
const totalTeams = async () => {
    try {
        work = await allTeams()
        if (!work){console.log("Unable to retrieve all teams")}
        else{
            return work
        }
    } catch (error) {
        console.log(error.message)
    }
}

// to get a single team
const singleTeam = async (req,res,ID) => {
    const team = await getOneTeam(ID)
    try {if (!team){res.end(JSON.stringify(team))}
        else{res.end(JSON.stringify(team))}     
    } catch (error) {
        res.end(error.message)
    }
}

module.exports = {totalTeams, singleTeam}