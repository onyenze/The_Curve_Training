const recordModel = require("../models/records")

const createRecord = async(req,res)=>{
    try {
        const {math,english} = req.body
        const record = new recordModel(req.body)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}