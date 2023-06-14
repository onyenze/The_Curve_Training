const express = require("express")

const router = express.Router()
const createProfile = require("../Controllers/controller")


router.post("/create",createProfile)

module.exports= router