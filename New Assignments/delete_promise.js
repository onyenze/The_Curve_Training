const fs = require("fs").promises;
// fs.writeFile("testing2.txt","We are here but not new")
// .catch((e) => {
//     console.log(e);
// })

fs.unlink("./testing2.txt",)
.catch((e) => {
    console.log(e);
})