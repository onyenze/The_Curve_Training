const Validator = require('fastest-validator')

const validator = new Validator();

const createUserSchema = {
    name: {
        type: 'string',
        min: 3,
        max: 50
    },
    age: {
        type: 'number',
        positive: true,
        integer: true
    },
    email: {
        type: 'email'
    },
    website: {
        type: 'url',
        optional: true
    }
};

module.exports = {
    validator,
    createUserSchema
}