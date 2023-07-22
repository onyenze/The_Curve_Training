// const jwt = require("jsonwebtoken")
// const user = require("../models/userModel")
// const dotenv = require("dotenv")
// dotenv.config()

// // auth middleware
// const userAuth = async(req,res,next)=>{try {
//     const hasAuthorization = req.headers.authorization
//     if(!hasAuthorization){
//         res.status(404).json({
//             message: "No authorization token provided"
//         })
//     } 
//         const token = hasAuthorization.split(" ")[1]
//         console.log(token);
//             const decodedToken =  await jwt.verify( token, process.env.MY_SECRET )
//             console.log(decodedToken)
//             req.user = JSON.stringify(decodedToken);
//             req.userId = decodedToken.userId;
//             req.userEmail = decodedToken.email;
//             req.username = decodedToken.username;
//             console.log(req.user);
//             next();
//         } catch (error) {
//             res.status(500).json({ message: error.message})
//         }
// }


// // Admin middleware
// const authenticator = async(req,res,next)=>{
//     const newUser = await user.findById(req.params.id)
//     const token = newUser.token
//     jwt.verify(
//         token, 
//         process.env.MY_SECRET,
//         (err,payLoad)=>{if(err)res.status(400).json({message:err.message})
//     else {
//         req.user = payLoad
//         next()
//     }}
//         )
// }
// const isAdminAuthorized = (req,res,next)=>{
//     authenticator(req,res,(async()=>{
//         const existingUser = await user.findById(req.params.id)
//         if(existingUser.isAdmin==false){res.json("You are not an admin")}
//         else{
//             next()
//         }
//     }))
// } 


// const isSuperAdminAuthorized = (req,res,next)=>{
//     authenticator(req,res,(async()=>{
//         const existingUser = await user.findById(req.params.id)
//         if(existingUser.isSuperAdmin==false){res.json("You are not a Super admin")}
//         else{
//             next()
//         }
//     }))
// } 
// module.exports = {userAuth,isAdminAuthorized,isSuperAdminAuthorized}

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const adminModel = require("../models/adminModel")

const dotenv = require("dotenv");
dotenv.config();

// auth middleware
const userAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
        const hasAuthorization = req.headers.authorization
      const token = hasAuthorization.split(" ")[1];

      const decodedToken = await jwt.verify(token, process.env.MY_SECRET);
      req.user = JSON.stringify(decodedToken);
      req.userId = decodedToken.userId;
      req.userEmail = decodedToken.email;
      req.username = decodedToken.username;
      next();
    } else {
      res.status(404).json({
        message: "No authorization found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isAdminAuthorized = async (req, res, next) => {
  try {
    
    
    const user = await User.findById(req.params.adminId)
    console.log(user);
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "not an admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isSuperAdminAuthorized = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.isSuperAdmin) {
      next();
    } else {
      res.status(401).json({ message: "not a super admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userAuth, isAdminAuthorized, isSuperAdminAuthorized };