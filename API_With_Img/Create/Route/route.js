const express = require("express")

const router = express.Router()
const createProfile = require("../Controllers/controller")
const mult = require("../multer/multer")


router.post("/create",mult,createProfile)

module.exports= router