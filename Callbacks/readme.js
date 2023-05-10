const fs = require("fs")
const myFile = fs.readFile("./sample.txt","utf8",(error,data)=>{
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
})
