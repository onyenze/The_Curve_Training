const express = require("express")

const router = express.Router()
const {foodMenu,getBranch,getAllBranch,updateMenu} = require("../Controllers/controller")


router.post("/create",foodMenu)
router.get("/getOne/:branch",getBranch)
router.get("/getAll",getAllBranch)
router.patch("/update/:branch",updateMenu)
module.exports= router