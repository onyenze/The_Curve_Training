const fs = require("fs")
// using tryawait to creat files

// const writeFiles = async () => {
//     try{
//         await fs.writeFile("./practice.txt","I don't want to be a failure",(e)=>{
//             console.log("created")
//         })
//     } catch (e) {console.log(e)}
// }

// writeFiles()

// using tryawait to read files

// const readFiles = async ()=>{
//     try {
//         await fs.readFile("./practice.txt","utf-8",(e,d)=>{
//             console.log(d.toString())
//         })
//     } catch (e) {console.log(e)}
// }
// readFiles()

// appending content to a new file

// const appendFiles = async () => {
//     try {
//         await fs.appendFile("./practice.txt","\nI will never be a failure",(d)=>{
//             console.log(d)
//         })
//     } catch (e) {console.log(e)}
// }

// appendFiles()


// function readPromise () {
//     return new Promise ( (resolve,reject) => {
//         fs.readFile("./practice.txt",(error,data)=>{
//             if (error){reject(errror)}
//             else {resolve(data)
//             console.log(data.toString())}
//         })
//     })
// }

// readPromise ()

// function appendPromise () {
//     return new Promise ( (resolve,reject)=>{
//         fs.appendFile("./practice.txt","\nhow do you like it",(error)=>{
//             if (error){reject(error)}
//             else{resolve(data)}
//         })
//     })
// }
// appendPromise()

function tripleThreat() {
    return new Promise ( (resolve,reject)=>{
        fs.readFile("./testing.txt",(error,data)=>{
            if (error){reject(error)}
            else{resolve(data)
            fs.appendFile("./testing.txt","\ni have added something",(error)=>{
                if (error){reject(error)}
                else{fs.readFile("./testing.txt",(error,data)=>{
                    if (error){reject(error)}
                    else{resolve(data)
                    console.log(data.toString())}
                })}
            })}
        })
    })
}
tripleThreat()