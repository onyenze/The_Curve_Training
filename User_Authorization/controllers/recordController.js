const recordModel = require("../models/records")

const createRecord = async(req,res)=>{
    try {
        const {math,english} = req.body
        const record = new recordModel(req.body)

        const user  =  await record.save()

        res.status(201).json({
            message:"Created",
            data:user
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {createRecord}