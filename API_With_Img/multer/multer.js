const multer = require("multer")
const path = require("path")

const storeMult = multer.diskStorage(
    {destination:(req,file,cb)=>{
        cb(null,"grace")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }}
    
)
const fileType = (req,file,cb)=>{
    //const extName=path.extname(file.originalname)
    if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg" )
    {cb(null,true)
} else{
    cb(null, false)
}
}
const mult = multer({storage:storeMult,limits:{fileSize:1024001024},fileFilter:fileType}).single("ProfilePicture")
// const mult = multer({storage:storeMult,limits:{fileSize:1024*1024}}).array("ProfilePicture",5)
module.exports = mult