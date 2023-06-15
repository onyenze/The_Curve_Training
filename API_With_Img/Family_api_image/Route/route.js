const express = require("express")

const router = express.Router()
const {createProfile,getFamily,getProfile,updateProfile,deleteProfile} = require("../Controller/controller")
const upload = require("../multer/multer")


router.post("/create",upload.fields( [ { name: "childrenImages", maxCount: 10 } ] ),createProfile)
router.get("/getAll",getFamily)
router.get("/getOne",getProfile)
router.put("/update",upload.fields( [ { name: "childrenImages", maxCount: 10 } ] ),updateProfile)
router.delete("/delete",deleteProfile)

module.exports= router