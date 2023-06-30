const {
    newContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
} = require('../controllers/controller')

const newComment = require("../controllers/commentController")
const express = require('express')
const router = express.Router()

router.get('/book', getAllContacts)
router.get('/book/:id', getContactById)
router.post('/book', newContact)
router.put('/book/:id', updateContact)
router.delete('/book/:id', deleteContact)

// route for comments
router.post("/comment/:id", newComment)

module.exports = router