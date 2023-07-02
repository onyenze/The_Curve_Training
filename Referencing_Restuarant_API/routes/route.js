const {
    newResturant,
    getResturant,
    updateResturant,
    deleteResturant
} = require('../controllers/controller')
const {
    newReference,
    getReference,
    updateReference,
    deleteReference
} = require('../controllers/referencedController')
const express = require('express')
const router = express.Router()

const { validateBranch, validateMenu } = require("../middleware/validator")

router.get('/book')
router.get('/get/:id',getResturant)
router.post('/create', validateBranch,newResturant)
router.put('/update/:id', updateResturant)
router.delete('/book/:id', deleteResturant)


// route for references
router.post('/reference/:id', validateMenu,newReference)
router.get('/reference/:id',getReference)
router.put('/reference/:id', updateReference)
router.delete('/:resturantId/reference/:referenceId', deleteReference)

module.exports = router