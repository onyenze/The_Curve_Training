const footballDb = require("../footballDatabase.json")

// console.log(footballDb)

//create a function to get all teams
const allTeams =  ()=> {
   return new Promise((resolve)=>{
    resolve(footballDb)
   })
}
module.exports=allTeams