// const promise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         const randomNumber = Math.floor(Math.random()*10)
//         if(randomNumber < 0.5 ){
//             resolve(randomNumber);}
//         else{
//             reject(`${randomNumber} is greater than 0.5`);
//         }
//     },3000)
// })

// const asynFunction = async()=>{
//     try{
//         let result = await promise
//         console.log("positve " +result)
//     } catch (error){
//         console.log("negative" +error)
//     }
// }

// asynFunction()

const fs = require("fs").promises;

fs.readFile("./sample.txt", "utf8")
.then(()=> {
    console.log(data)
})
.catch(() => {
    console.log(e)
})


const fs = require("fs").promises;
fs.writeFile("./sample2.txt","the sample 2")
.catch((e) => {
    console.log(e)
})
fs.appendFile("./sample2.txt","\n the sample 2 has been updated")
.catch((e)=>{
    console.log(e) 
})