const Joi = require ("@hapi/joi")

const validatePerson = (data) => {
    const schema = Joi.Object({
        personName:Joi.string().required(),
        personPhone:Joi.string().pattern(/^[0-9]{11}$/).required(),
        personProfile:Joi.string().required()
    })
    
   return schema.validate(data)
}

module.exports.validatePerson = validatePerson