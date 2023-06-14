const profileModel= require("../Model/model.js")
const path = require("path")






// function to create a food menu
async function createProfile(req,res){try {
    if(!req.file){
        res.status(500).json({
            message: "your file failed to upload"
        })
    } else{
        const data = {
            name : req.body.name,
            class: req.body.class,
            age: req.body.age,
            ProfilePicture: req.file.path
         }
        const profile = await profileModel.create(data)
        res.status(200).json({message:"Created Successfully",
        show:profile})
    }
} catch (error) {
    res.status(400).json({message:error.message})
}

}

module.exports=createProfile