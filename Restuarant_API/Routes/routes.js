const express = require("express")

const router = express.Router()
const {foodMenu,getBranch,getAllBranch} = require("../Controllers/controller")


router.post("/create",foodMenu)
router.get("/getOne/:branch",getBranch)
router.get("/getAll",getAllBranch)
module.exports= router