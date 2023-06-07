const express = require("express")
const router = express.Router()
const {newPatient,onePatient,updatedPatient,deletedPatient} = require("../controllers/hospitalController")

router.post("/patients",newPatient)
router.get("/onePatient/:id", onePatient)
router.put("/update/:id",updatedPatient)
router.delete("/delete/:id",deletedPatient)

module.exports=router