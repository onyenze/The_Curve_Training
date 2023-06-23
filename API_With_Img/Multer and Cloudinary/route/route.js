const express = require("express")
const router = express.Router()

const upload = require("../Utils/multer")
const {createprofile,updatePerson,deletePerson} = require("../controller/controller")
const {validatePerson} = require("../middleware/validator")



router.post("/create",upload.single("personProfile"),createprofile)
router.put("/profiles/:id",upload.single("personProfile"),updatePerson)
router.delete("/profiles/:id",upload.single("personProfile"),deletePerson)


module.exports=router