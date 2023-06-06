const bagModel = require("../Models/bagModel")

exports.newCollection = async (req,res)=>{
    try {
        const newData = await bagModel.create(req.body)
        res.status(201).json({
            message:"Collection created successfully",
            data:newData
        })
    } catch (error){
        res.status(400).json({
            message:error.message
        })
    }
}

// view all collection
exports.viewAll = async(req,res)=>{
    try {
       const allRecords = await bagModel.find()
       res.status(201).json({
        message:"Data found" + allRecords.length,
        data:allRecords
       }) 
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

// update record from collection
exports.updateInfo = async (req,res)=>{
    try {
        entryId = req.params.id
        const data = await bagModel.findByIdAndUpdate(entryId,req.body,{new:true})
        res.status(201).json({
            message:"Updated",
            info:data
        })
    } catch (error) {
         res.status(400).json({
            message:error.message
        })       
    }
}

// delete record
exports.deleteData = async (req,res)=>{
    try {
        const entryId = req.params.id
        // const data = await bagModel.findById(entryId)
        const deletedData = await bagModel.findByIdAndDelete(entryId)
        res.status(201).json({
            message:"deleted",
            // info:data,
            result : deletedData
        })
    } catch (error) {
        res.send(error.message)
    }
} 