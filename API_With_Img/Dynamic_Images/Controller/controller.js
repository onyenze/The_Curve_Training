const imageModel = require( '../Model/model' );
const fs = require('fs');
const path = require("path")


// create profile
const createProfile = async(req,res)=>{
    try {
        const {name,course} = req.body
        const profile = new imageModel({
            name,
            course,
            profileImage:req.files["profileImage"][0].filename
        })
        const savedProfile = profile.save()
        if(!savedProfile){
            res.status(400).json({message:"profile not created"})
        }else {
            res.status(400).json({message:"profile has been created",
            data:savedProfile
            }) 
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = createProfile
