const express = require("express")
const router = express.Router()
const {signUp, signIn, signOut,userVerify,getAll,resetpassword,forgotPassword} = require("../controllers/controller")

const {isAdminAuthorized,isSuperAdminAuthorized} = require("../middlewares/middleware")

router.route("/users")
.post(signUp) // create a new user account

router.route( "/sign-in" )
    .post(signIn)

router.route( "/getAll/:id" )
    .get(isAdminAuthorized, getAll)

router.route( "/getAllW/:id" )
    .get(getAll)

router.route("/userverify/:id/:token")
.put(userVerify)

router.route("/forgot-password").get(forgotPassword) 
router.route("/reset-password/:id").put(resetpassword);

router.route( "/sign-out" )
    .post(signOut)

module.exports = router