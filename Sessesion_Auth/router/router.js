const express = require("express")
const router = express.Router()
const {createUser, signIn,getOne, isAuth} = require("../controllers/userController")

router.route("/create").post(createUser)


router.route("/login").post(signIn)

router.route("/getOne/:id").get(getOne,isAuth)

module.exports = router