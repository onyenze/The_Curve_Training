const fs = require("fs")

// const readFiles = async () => {
//     try {
//         await fs.readFile("./sample.txt","utf-8",(e,d)=>{
//             console.log(d.toString())
//         })
//     } catch (e) {
//         console.log(e)
//     }
// }

// readFiles()


const writeFiles = async () => {
    try {
        await fs.writeFile("./sample1.txt","the day is bright",(e)=>{
            console.log("created")
        })
    } catch (e) {
        console.log(e)
    }
}

writeFiles()


// const appendFiles = async () => {
//     try {
//         await fs.appendFile("./sample1.txt","\n \n today is a good day",(e)=>{
//             console.log("modified")
//         })
//     } catch (e) {
//         console.log(e)
//     }
// }

// appendFiles()


// const unlinkFiles = async () => {
//     try {
//         await fs.unlink("./sample1.txt",(e)=>{
//             console.log("deleted")
//         })
//     } catch (e) {
//         console.log(e)
//     }
// }

// unlinkFiles()
