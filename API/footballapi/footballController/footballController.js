const allTeams = require("../footballModel/footballModel")


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
totalTeams()

module.exports = totalTeams