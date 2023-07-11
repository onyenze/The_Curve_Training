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

       // save the generated token to "token" variable
       const token = await genToken( isEmail );
       // return a response
       res.status( 200 ).json( {
           message: "Sign In successful",
           token: token
       })
        

           
    } catch (error) {
       res.status(500).json({
        message:error.message
       }) 
    }
}


// signOut
const blackList = []
const signOut = async (req, res) => {
    try {
        // check for content in the authorization head
        const authHeader = req.headers.authorization;
        // get the token from the authorization head
        const token = authHeader.split( " " )[ 1 ];
        // remove the token from the authentication head and place it in the blacklist array.
        await blackList.push( token );
        // return a success response
        res.status(200).json({
        status: "Success",
        message: "User logged out successfully.",
        });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const genToken = async ( user ) => {
    const token = await jwt.sign( {
        userId: user._id,
        username: user.username,
        email: user.email,
        password: user.password
    }, process.env.JWT_SECRETE, {expiresIn: "50m"} )
    
    return token;
}

module.exports = {signUp, signIn, signOut}