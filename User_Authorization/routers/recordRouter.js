const express = require("express")
const router = express.Router()
const {createRecord} = require("../controllers/recordController")

router.route("/users")
.post(createRecord) // create a new user account

module.exports = router