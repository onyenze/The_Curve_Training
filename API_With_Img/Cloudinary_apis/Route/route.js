const express = require("express")

const router = express.Router()
const newContact = require("../Controllers/controller")


router.post("/create",newContact)

module.exports= router