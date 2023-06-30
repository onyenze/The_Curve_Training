const userModel = require('../models/userModel');
const {
    validator,
    createUserSchema
} = require('../middleware/fastestValidator');

const createUser = async (req, res)=>{
    try {
        const validateUser = validator.validate(req.body, createUserSchema);
        if (validateUser === true) {
            const user = await userModel.create(req.body);
            if (!user) {
                res.status(400).json({
                    message: 'Cannnot Create User'
                })
            } else {
                res.status(201).json({
                    message: 'User Created',
                    data: user
                })
            }
        } else {
            res.status(400).json({
                errors: validateUser
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const allUsers = async (req, res)=>{
    try {
        const users = await userModel.find();
        if (users.length === 0) {
            res.status(400).json({
                message: 'No users found'
            })
        } else {
            res.status(200).json({
                message: 'All users found',
                data: users
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const oneUser = async (req, res)=>{
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        if (!user) {
            res.status(400).json({
                message: 'User not found'
            })
        } else {
            res.status(200).json({
                message: 'User successfully Found',
                data: user
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const updateUser = async (req, res)=>{
    try {
        const validateUser = validator.validate(req.body, createUserSchema);
        if (validateUser === true) {
            const updateUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if (!updateUser) {
                res.status(400).json({
                    message: 'User cannot be Updated'
                })
            } else {
                res.status(200).json({
                    message: 'User successfully updated',
                    data: updateUser
                });
            }
        } else {
            res.status(500).json({
                errors: validateUser
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const deleteUser = async (req, res)=>{
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.params.id)
        if (!deleteUser) {
            res.status(400).json({
                message: 'User cannot be Deleted.'
            })
        } else {
            res.status(200).json({
                message: 'User deleted successfully',
                data: deleteUser
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



module.exports = {
    createUser,
    allUsers,
    oneUser,
    updateUser,
    deleteUser
}