const fs = require("fs")

reading =fs.readFileSync("./readingpdf.pdf")


console.log(reading.toString())

