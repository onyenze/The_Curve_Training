const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// signup
const signUp =async(req,res)=>{
    try {
        const {username,email,password} = req.body
        const isEmail = await userModel.find({email})
        if(isEmail){
            res.status(400).json({
                message:"Email already Exist"
            })
        } else {
            const saltedRound = 10
            const hashedPassword = await bcryptjs.hash(password, saltedRound)

        const data = {
            username,
            email,
            password:hashedPassword
        }
        const user = new userModel.create(data)
        res.status.json({
            data:user
        })
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const signIn = async (req,res)=>{
    try {
        const {username,email,password} = req.body

        // validate username
        const isEmail = await userModel.findOne({email})
        if(!isEmail){res.status(400).json({
            message:"Email is incorrect"
           }) } 
        
        // validate password
        const isPassword = await bcryptjs.compare(password, isEmail.password)
        if(!isPassword){res.status(400).json({
            message:"Incorrect Password"
        })}

        // generate the token
        const checkToken = jwt.sign(
            {username,email},
            process.env.MY_SECRET,{expiresIn:"1h"})

           
    } catch (error) {
       res.status(500).json({
        message:error.message
       }) 
    }
}

module.exports = {signUp}