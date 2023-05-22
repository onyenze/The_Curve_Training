const teams = require("../../footballapi/footballDatabase.json")
const readAll = ()=>{
    return new Promise ((resolve,reject)=>{
        resolve(teams)
    })
}
const readOne = () =>{
        const team = teams.find((item)=>item.ID === "5")
        const show = JSON.stringify(team)
        console.log(show)
    

}
readOne()
module.exports = {readAll, readOne}