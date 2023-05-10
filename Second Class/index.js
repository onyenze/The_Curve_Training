// let display = `My father's name is John, he is from "lokoja"`
// console.log(display);
// console.log("show the above" +display);
// const eventEmitter = require("events");
// const eventer = new eventEmitter();
// eventer.on("logged message",()=>{console.log("i have been emitted")});
// eventer.emit("logged message");
const fs = require("fs")
fs.createReadStream("josh.txt").on("data",(chunk)=>{
    console.log(chunk)
})
