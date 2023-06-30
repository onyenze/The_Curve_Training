const contactModel = require('../models/model')

const newContact = async (req, res)=>{
    try {
        const newUser = await contactModel.create(req.body)
        res.status(200).json({data:newUser})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllContacts = async (req, res)=>{
    try {
            
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getContactById = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateContact = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const deleteContact = async (req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    newContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
}