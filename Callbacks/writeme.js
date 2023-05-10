const fs = require("fs")
fs.writeFile("hardWork.html","what's happening",(error)=>{
    if(error){console.log(error)}
    else{console.log("The file has been created")}
    
})