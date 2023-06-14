const profileModel= require("../Model/model.js")





// function to create a food menu
async function createProfile(req,res){try {
    const profileModel = await profileModel.create(req.body)
    res.status(200).json({message:"Created Successfully",
    data:menu})
} catch (error) {
    res.status(400).json({message:error.message})
}

}

module.exports=createProfile