const footballDb = require("../footballDatabase.json")
const { v4: uuidv4 } = require("uuid")


//create a function to get all teams
const allTeams =  ()=> {
   return new Promise((resolve)=>{
    resolve(footballDb)
   })
}

// create a function to get one team
const getOneTeam = (id) => {
   return new Promise ((resolve)=>{
      const team = footballDb.find((item)=>(item.ID === id))
      resolve(team)
   })
}
module.exports={allTeams, getOneTeam}