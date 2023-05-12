const fs = require("fs")

// function readPromise () {
//     return new Promise( (resolve, reject) => {
//         fs.readFile("./sample1.txt",(error,data) => {
//             if (error) {
//                 reject(error)
//             }else{
//                 resolve(data)
//                 console.log(data.toString())
//             }
//         })

//     })
// }

function readPromise (path,content) {
    return new Promise( (resolve, reject) => {
        fs.readFile(path,(error,data) => {
            if (error) {
                reject(error)
            }else{
                resolve(data)
                fs.appendFile(path,content,(error,data) => {
                    if (error) {
                        reject(error)
                    }else{
                        resolve(data)                
                    }
                })
                console.log(data.toString())
            }
        })
        
        console.log(` it is located at ${path}, this was added =  ${content}`);
    })
}

readPromise ("./sample.txt","\nnew content")