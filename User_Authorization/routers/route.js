const express = require("express")
const router = express.Router()
const {signUp, signOut,userVerify,forgotPassword,LoggedinUsers} = require("../controllers/controller")
const {createAdmin,signIn,getAll,updateAdmin,upgradeUserToAdmin,upgradeAdminToSuperAdmin} = require("../controllers/adminController")
const {userAuth,isAdminAuthorized,isSuperAdminAuthorized} = require("../middlewares/middleware")

router.route("/users")
.post(signUp) // create a new user account

router.route( "/sign-in" )
    .post(signIn)

router.route( "/getAll/:id" )
    .get(isAdminAuthorized, getAll)



router.route('/loginusers')
    .get(LoggedinUsers) 
    

router.route('/signIn')
    .post(signIn)
// router.route("/userverify/:id/:token")
//     .put(userVerify)

// router.route("/forgot-password").post(forgotPassword) 
// router.route("/reset-password/:id/:token").put(resetpassword);

router.route( "/sign-out" )
    .post(signOut)

// admin routes
router.route("/updateAdmin/:id")
    .put(isAdminAuthorized,updateAdmin)

router.route( "/create/:id" )
    .post(isAdminAuthorized, createAdmin)

router.route( "/createAdmin/:userId" )
    .put(userAuth,isAdminAuthorized, upgradeUserToAdmin)
// super admin
router.route( "/createSuperAdmin/:id" )
    .put(isSuperAdminAuthorized, upgradeAdminToSuperAdmin)
module.exports = router