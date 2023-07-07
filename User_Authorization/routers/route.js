const express = require("express")
const router = express.Router()
const {signUp} = require("../controllers/controller")

router.route("/users")
.post(signUp) // create a new user account

module.exports = router