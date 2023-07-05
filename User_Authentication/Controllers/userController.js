const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

exports.newUser = async(req,res)=>{
    try {
        const {username,email,password}=req.body
        // validate email

        // hashed the password
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password,salt)

        const data = {
            username,
            email,
            password:hash
        }

        const createUser = new userModel(data)

        // generate the token
        const newToken = jwt.sign({
            username,
            password
        }, 
        process.env.JWT_TOKEN,
        {expiresIn:"1d"})

        createUser.token = newToken

        await createUser.save()
        if (!createUser){
            res.status(400).json({
                status:"Failed",
                message:error.message
            })
        } else {
            res.status(201).json({
                status:"Created",
                data:createUser
        })
    }} catch (error) {
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }

}

// sign in

exports.signIn = async (req,res)=>{
    try {
        const {username,password} = req.body

        // validate the username
        const check = await userModel.findOne({username:username})
        if(!check){res.status(400).json({message:"user unavailable"})}


        // validate password
        const isPassword = await bcryptjs.compare(password, check.password)
        if(!isPassword){res.status(400).json({message:"wrong password format"})}


        // generate token
        const checkToken = jwt.sign({
            username,
            password
        }, 
        process.env.JWT_TOKEN,
        {expiresIn:"1d"})

        check.token = checkToken

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