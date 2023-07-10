const express = require("express")
const router = express.Router()
const {createUser, signIn,} = require("../controllers/userController")

router.route("/create").post(createUser)


router.route("/login").post(signIn)

module.exports = router