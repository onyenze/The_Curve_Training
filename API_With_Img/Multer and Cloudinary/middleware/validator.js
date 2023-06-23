const Joi = require ("@hapi/joi")

// const validatePerson = (data) => {
//     const schema = Joi.object({
//         personName:Joi.string().required(),
//         personPhone:Joi.string().pattern(/^[0-9]{11}$/).required(),
//         personProfile:Joi.string().required()
//     })
    
//    return schema.validate(data)
// }

// module.exports.validatePerson = validatePerson

const validatePerson = (req,res,next)=>{
        const schema = Joi.object({
        personName:Joi.string().required(),
        personPhone:Joi.string().pattern(/^[0-9]{11}$/).required(),
        personProfile:Joi.string().required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        const validateError = error.details.map((detail)=>(detail.message))
        // const validateError = error.details[0].message
        res.status(409).json({
            message: validateError
        })
    } else {
        next()
    }
}

module.exports = validatePerson