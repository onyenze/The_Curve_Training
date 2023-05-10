const fs = require("fs")

// const myFile = fs.readFileSync("./sample.txt", "utf8")
// console.log(`The content of the file is \n: ${myFile}`);


const myFile = fs.readFile("./sample.txt","utf8",(error,data)=>{
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
})

// console.log(myFile)




fs.writeFile("hardWork.html","what's happening",(error)=>{
    if(error){console.log(error)}
    else{console.log("The file has been created")}
    
})

fs.appendFile("hardWork.html"," still grinding",(error)=>{
    if(error){console.log(error)}
    else{console.log(" stuffs have been added")}

})

