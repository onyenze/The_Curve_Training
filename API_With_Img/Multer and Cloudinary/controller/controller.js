const { profile } = require("console")
const personModel = require("../model/model")
const cloudinary = require("../Utils/cloudinary")
const fs = require("fs")
const validatePerson = require("../middleware/validator")


const createprofile = async (req,res)=>{
    try {console.log(req.file)
        const {personName,personPhone}= req.body
        const {error} =  await validatePerson(req.body)
        if (error){
            res.status(409).json({
                message:error.details[0].message
            })
        }
        const result = await cloudinary.uploader.upload(req.file.path)

        const newPerson = new personModel({
            personName,
            personPhone,
            personProfile: result.secure_url
        })
        fs.unlinkSync(req.file.path)
        const savePerson = await newPerson.save()
        if (newPerson){
            res.status(200).json({
               message:"Created",
                data:savePerson
            })
        } else {res.status(400).json({
            message:"failed"
        })}
    } catch (error) {
        res.status(500).json({
            message:error
        })
        console.log(error)
    }
}
// const getPersons = async (req,res)=>{
//     try {
//         const persons = await personModel.find()
//         if(persons == null){res.status(400).json({
//             message:"error"
//         })}else {}
//     } catch (error) {
        
//     }
// }

const updatePerson = async (req,res)=>{
    try {
        const {id} = req.params
        const person = await personModel.findById(id)
        const {personName,personPhone}= req.body

        if(person){
            if (person.personProfile){
            const public_id = person.personProfile.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(public_id)
            
            const result = await cloudinary.uploader.upload(req.file.path)
            
            
            person.personName = personName;
            person.personPhone=personPhone;
            person.personProfile= result.secure_url
            await profile.save()

            fs.unlinkSync(req.file.path)
            }
        } else {res.status(400).json({message:"Not found"})}
    } catch (error) {
        res.status(500).json({message:"Not found"})
    }
}

const deletePerson = async (req,res)=>{
    try {
        const {id} = req.params
        const person = await personModel.findById(id)

        if(person){
            if (person.personProfile){
            const public_id = person.personProfile.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(public_id)
            }
        } else {res.status(400).json({message:"Not found"})}
    } catch (error) {
        res.status(500).json({message:"Not found"})
    }
}
module.exports = {createprofile,updatePerson, deletePerson}