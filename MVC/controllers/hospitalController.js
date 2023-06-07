const hospitalModel=require("../models/hospitalModel")


// create a new patient
const newPatient = async (req,res)=>{
    try {
        const patient = await hospitalModel.create(req.body)
    if(patient){
        res.status(200).json({
            message:patient
        })
    } else {res.status(400).json({message:"error"})}
    } catch (error) {
       res.status(400).json({message:error.message}) 
    }
}
// get one patient
const onePatient = async (req,res)=>{
    try {
        const patientId = req.params.id
        const patient = await hospitalModel.findById(patientId)
        if (patient){res.status(200).json({
            message:"found",
            data:patient
        })}
    } catch (error) {
        
    }
}
// update one patient
const updatedPatient = async (req,res)=>{
    try {
        const patient = await hospitalModel.findByIdAndUpdate(req.params.id,req.body)
        if (patient){res.status(200).json({
            message:"Updated",
            data:patient
        })}
    } catch (error) {
        console.log(error.message)
    }
}
// delete one patient
const deletedPatient = async (req,res)=>{
    try {
        const patient = await hospitalModel.findByIdAndDelete(req.params.id)
        if (patient){res.status(200).json({
            message:"Updated",
            data:patient
        })} else {res.status(200).json({
            message:error.message
        })}
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {newPatient,onePatient,updatedPatient,deletedPatient}