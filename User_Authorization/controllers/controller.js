const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {sendEmail} = require("./email")

// signup
const signUp =async(req,res)=>{
    try {
        const {username,email,password} = req.body
        const isEmail = await userModel.findOne({email})
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

 

        const user = new userModel(data)
        // save the generated token to "token" variable
       const newToken = await genToken( user, {expiresIn: "5m"} )

        user.token = newToken

        const subject = "Kindly Verify"
        const link = `${req.protocol}://${req.get("host")}/api/userverify/${user._id}/${newToken}`
        const message = `Click on the link ${link} to verify, kindly note that this link will expire after 5 minutes`
        sendEmail({email:user.email,
            subject,
            message})
        await user.save()
        res.status(201).json({
            data:user
        })
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// user verify
const userVerify = async(req,res)=>{
    try {
        const registeredUser = await userModel.findById(req.params.id)
        const registeredToken = registeredUser.token
        // check if the token attached to the user is valid
        await jwt.verify(registeredToken,process.env.MY_SECRET,(err,data)=>{
            if(err){res.json("This link has expired")}
            else {
                return data
            }
        })
        // Update if the registered user has been verified 
        const verified = await userModel.findByIdAndUpdate(req.params.id,{isVerified:true},)
        if(!verified){
            res.status(400).json({
                message:"unable to verify user"
            })
        } else {
            res.status(200).json({
                message:"user has been verified"
            })
        }
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
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
        else if (checkIfVerify==false){
        
        // generate a token for the link to expire after 5 minutes
        const newToken = await genToken( isEmail, {expiresIn: "5m"} )

        isEmail.token = newToken
        // Re send link to re-verify an account that has signed up previously
        const subject = "Kindly Re-Verify"
        const link = `${req.protocol}://${req.get("host")}/api/userverify/${isEmail._id}/${newToken}`
        const message = `Click on the link ${link} to verify, kindly note that this link will expire after 5 minutes`
        sendEmail({email:isEmail.email,
            subject,
            message})

            return res.json("you havent verified your acct,check your email to reverify your account")
        }
        // update the user to logged in
        const userLoggedin = await userModel.findByIdAndUpdate(isEmail._id, {islogin: true});
       // save the generated token to "token" variable
       const token = await genToken( isEmail, {expiresIn: "1d"} );
       // return a response
       res.status( 200 ).json( {
           message: "Sign In successful",
           token: token,
           data :userLoggedin
       })   }
        

           
    } catch (error) {
       res.status(500).json({
        message:error.message
       }) 
    }
}

// forgot password
const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
      //create a link with the reset password link and send it to email
      const user = await userModel.findOne({email:email});
      console.log(user);

      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      } else {
        const subject = "forgotten password";
        // for better security practice a unique token should be sent to reset password instead of user._id
        // generate a token for the link
        const newToken = await genToken( user, {expiresIn: "5m"} )

        user.token = newToken
        const link = `${req.protocol}://${req.get("host")}/api/reset-password/${user._id}/${newToken}`;
        const message = `click the ${link} to reset your password`;
        const data = {
          email: email,
          subject,
          message,
        };
        sendEmail(data);
        res.status(200).json({
          message: "Check your registered email for your password reset link",
          data:user
        });
      }  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
// to reset password
const resetpassword = async (req, res) => {
    try {
      const { id } = req.params;
      const { newpassword } = req.body;
      const registeredUser = await userModel.findById(id)
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
      const user = await User.findByIdAndUpdate(id, { password: hashedPassword },{new:true});
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
        const userLogout = await userModel.findByIdAndUpdate(id, {islogin: false});
        
        // return a success response
        res.status(200).json({
        status: "Success",
        message: "User logged out successfully.",
        data:userLogout
        });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const genToken = async ( user, time ) => {
    const token = await jwt.sign( {
        userId: user._id,
        username: user.username,
        email: user.email
    }, process.env.MY_SECRET, time )
    
    return token;
}

// const decodedToken = async (user)=>{
//     const token = await jwt.verify
// }


// get all users
const getAll = async(req,res)=>{
    try {
       const autheticatedUser = await userModel.findById(req.params.id) 
       const allUsers = await userModel.find()
       if (allUsers) {res.json(allUsers)} else {res.json("Users not found")}
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// get All logged in users
const LoggedinUsers = async (req, res)=>{
    try {
        const loginUsers = await userModel.findAll({islogin: true})
        if (loginUsers.length == 0) {
            res.status(404).json({
                message: 'No Users logged in'
            })
        } else {
            res.status(200).json({
                message: ' Loggedin Users',
                data: loginUsers
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {signUp, signIn, signOut,userVerify,getAll,resetpassword,forgotPassword,LoggedinUsers}