const festac = require("../models/userModel")
const bcryptjs = require("bcryptjs")



const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }
    else {
        res.json("Please log in before you perform this action")
    }
}
const createUser = async(req,res)=>{
    try {
        const {name,email,password,phoneNumber}=req.body
        // validate email

        // hashed the password
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password,salt)

        const data = {
            name,
            email,
            phoneNumber,
            password:hash
        }

        const user = await festac.create(data)
        if (!user){
            res.status(400).json({
                status:"Failed",
                message:error.message
            })
        } else {
            res.status(201).json({
                status:"Created",
                data:user
        })
    }

    } catch (error) {
        res.status(500).json({status:"Failed",
        message:error.message})
    }
}



// sign in

const signIn = async (req,res)=>{
    try {
        const {name,password} = req.body

        // validate the username
        const check = await festac.findOne({name:name})
        if(!check){res.status(400).json({message:"user unavailable"})}


        // validate password
        const isPassword = await bcryptjs.compare(password, check.password)
        if(!isPassword){res.status(400).json({message:"wrong password format"})}

        req.session.isAuth = true

        await check.save()

        res.status(200).json({
            message:"Logged in",
            data : check
        })
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
}

const getOne = async(req,res)=>{
    try {
        const user = await festac.findById(req.params.id)
        res.status(200).json({
            message:"found",
            data:user
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {createUser, signIn, getOne,isAuth}