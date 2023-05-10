const fs = require("fs")
fs.appendFile("hardWork.html"," still grinding",(error)=>{
    if(error){console.log(error)}
    else{console.log(" stuffs have been added")}

})