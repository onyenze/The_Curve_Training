const jwt = require("jsonwebtoken")

// auth middleware
const userAuth = async(req,res,next)=>{
    const hasAuthorization = req.headers.authorization
    if(!hasAuthorization){
        res.status(404).json({
            message: "No authorization token provided"
        })
    } else {
        const token = hasAuthorization.split(" ")[1]
        const decodedToken = await jwt.verify(token, process.env.MY_SECRET)
        req.user = JSON.stringify(decodedToken)
        req.userId = decodedToken.userId
    }
}