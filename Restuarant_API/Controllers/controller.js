const { model } = require("mongoose")
const foodModel= require("../Model/model.js")





// function to create a food menu
async function foodMenu(req,res){try {
    const menu = await foodModel.create(req.body)
    res.status(200).json({message:"Created Successfully",
    data:menu})
} catch (error) {
    res.status(400).json({message:error.message})
}

}

async function getBranch(req,res){try {
    const branch = req.params.branch
    const branchName = await foodModel.findOne({branch})
    res.status(400).json({data:branchName})
} catch (error) {res.status(400).json({message:error.message})}

}

async function getAllBranch(req,res){try {
    const branchs = await foodModel.find()
    res.status(400).json({data:branchs})
} catch (error) {res.status(400).json({message:error.message})}

}

const updateMenu = async(req,res)=>{try {
    const theProduct = await foodModel.findOne(req.params)
    const  avil = theProduct.citizenMeal.main
    const updateProduct = await foodModel.updateOne({"req.body.main":avil},
    {$set:{"citizenMeal.main":req.body.main,
            "refuelMax.main":req.body.main,
            "refuel.main":req.body.main,
            "citizenMeal.sides":req.body.sides,
            "refuelMax.sides":req.body.sides,
            "citizenMeal.Drink":req.body.Drink,
            "refuelMax.Drink":req.body.Drink}})
    res.status(200).json({message:"the menu has been updated",
            data:updateProduct
           })
} catch (error) {
    res.json(error.message)  
}

}

module.exports ={foodMenu,getBranch,getAllBranch,updateMenu}