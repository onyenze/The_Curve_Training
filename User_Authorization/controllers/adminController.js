const adminModel = require("../models/adminModel")
const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



// createAdmin
const createAdmin =async(req,res)=>{
    try {
        req.params.id
        const {username,email} = req.body
        // const isEmail = await userModel.findOne({email})
        // if(isEmail){
        //     res.status(400).json({
        //         message:"Email already Exist"
        //     })
        // } else {
            const saltedRound = 10
            const hashedPassword = await bcryptjs.hash(password, saltedRound)

        const data = {
            username,
            email,
            password:hashedPassword
        }

 

        const admin = new adminModel(data)
        // save the generated token to "token" variable
    //    const newToken = await genToken( user, {expiresIn: "5m"} )

    //     user.token = newToken

    //     const subject = "Kindly Verify"
    //     const link = `${req.protocol}://${req.get("host")}/api/userverify/${user._id}/${newToken}`
    //     const message = `Click on the link ${link} to verify, kindly note that this link will expire after 5 minutes`
    //     sendEmail({email:user.email,
    //         subject,
    //         message})
        await admin.save()
        res.status(201).json({
            data:user
        })
        // }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//  to sign in
const signIn = async (req,res)=>{
    try {
        const {username,email,password} = req.body
        // validate username
        const isEmail = await userModel.findOne({email})
        if(!isEmail){res.status(400).json({
            message:"Email is incorrect"
           }) } else {
        // attach the boolean value of a verified account to a variable
        const checkIfVerify = isEmail.isVerified
        // validate password
        const isPassword = await bcryptjs.compare(password, isEmail.password)
        if(!isPassword){res.status(400).json({
            message:"Incorrect Password"
        })} 
        //check if the account has been verified previously 
        // else if (checkIfVerify==false){
        
        // // generate a token for the link to expire after 5 minutes
        // const newToken = await genToken( isEmail, {expiresIn: "5m"} )

        // isEmail.token = newToken
        // // Re send link to re-verify an account that has signed up previously
        // const subject = "Kindly Re-Verify"
        // const link = `${req.protocol}://${req.get("host")}/api/userverify/${isEmail._id}/${newToken}`
        // const message = `Click on the link ${link} to verify, kindly note that this link will expire after 5 minutes`
        // sendEmail({email:isEmail.email,
        //     subject,
        //     message})

        //     return res.json("you havent verified your acct,check your email to reverify your account")
        // }
       else{ // update the user to logged in
        const userLoggedin = await userModel.findByIdAndUpdate(isEmail._id, {islogin: true});
       // save the generated token to "token" variable
       const token = await genToken( isEmail, {expiresIn: "1d"} );
       // return a response
       res.status( 200 ).json( {
           message: "Sign In successful",
           token: token,
           data :userLoggedin
       })   }
        
    }
           
    } catch (error) {
       res.status(500).json({
        message:error.message
       }) 
    }
}

const genToken = async ( user, time ) => {
    const token = await jwt.sign( {
        userId: user._id,
        username: user.username,
        email: user.email
    }, process.env.MY_SECRET, time )
    
    return token;
}

// update user to admin
const upgradeUserToAdmin = async (req, res) => {
    try {
      const { userId } = req.params;
      const newAdmin = await userModel.findByIdAndUpdate(
        userId,
        { isAdmin: true },
        { new: true }
      );
      res.status(200).json({ message: "success", newAdmin });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// get all users
const getAll = async(req,res)=>{
    try {
       const autheticatedUser = await adminModel.findById(req.params.id) 
       const allAdmin = await adminModel.find()
       if (allAdmin) {res.json(allAdmin)} else {res.json("Users not found")}
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


// to update an admin
const updateAdmin = async(req,res)=>{
    try {
        req.params.id
        const {username,email} = req.body;
        const data = {
            username,email
        }
        const updatedAdmin = await adminModel.findByIdAndUpdate(req.params.id, data, {new: true});
        res.status( 200 ).json( {
            message: "Successfully Updated Profile",
            data: updatedAdmin
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}




const resetpassword = async (req, res) => {
    try {
      const { id } = req.params;
      const { newpassword } = req.body;
      const registeredUser = await adminModel.findById(id)
      const registeredToken = registeredUser.token
      // check if the token attached to the user is valid
      await jwt.verify(registeredToken,process.env.MY_SECRET,(err,data)=>{
        if(err){res.json("This link has expired")}
        else {
            return data
        }
    })
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(newpassword, salt);
      const user = await adminModel.findByIdAndUpdate(id, { password: hashedPassword },{new:true});
      if (user) {
        res.status(200).json({
          message: "password succesfully reset",
        });
      } else {
        res.status(500).json({
          message: "error changing password",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// create superAdmin
const upgradeAdminToSuperAdmin = async (req, res) => {
    try {
      const { adminId } = req.params;
      const newSuperAdmin = await adminModel.findByIdAndUpdate(
        adminId,
        { isSuperAdmin: true },{isAdmin:true},
        { new: true }
      );
      res.status(200).json({ message: "success", newSuperAdmin });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
// delete an Admin





module.exports = {createAdmin,signIn,getAll,resetpassword,updateAdmin,upgradeUserToAdmin,upgradeAdminToSuperAdmin}