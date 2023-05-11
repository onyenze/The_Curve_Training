const fs = require("fs")
// fs.writeFile("testing.txt","We are new here",(error) => {
//     if(error){console.log(error);}
//     else{console.log("File has been created");}
// })

fs.unlink("./testing.txt",(error) => {
    if(error){console.log(error)}
    else{console.log("File has been deleted");}
})