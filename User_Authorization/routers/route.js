const express = require("express")
const router = express.Router()
const {signUp, signIn, signOut} = require("../controllers/controller")

router.route("/users")
.post(signUp) // create a new user account

router.route( "/users/sign-in" )
    .post(signIn)

router.route( "/users/sign-out" )
    .post(signOut)

module.exports = router