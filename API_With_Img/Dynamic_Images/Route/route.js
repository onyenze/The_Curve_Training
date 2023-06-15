const express = require("express")
const router = express.Router();
const upload = require('../multer/multer')
const  createProfile = require( '../Controller/controller')

router.post( '/profiles', upload.fields( [ { name: "profileImage", maxCount: 1 } ] ), createProfile )




module.exports = router