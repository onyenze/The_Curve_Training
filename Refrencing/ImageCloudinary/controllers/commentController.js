const contactModel = require('../models/model')
const commentModel = require("../models/commentModel")

exports.newComment = async (req, res)=>{
    try {
        const user = await contactModel.findById(req.params.id)

        const userComment = await commentModel.create(req.body)

        userComment.link = user

        userComment.save()

        user.comment.push(userComment)

        user.save()

        res.status(200).json({
            message:"created",
            data:userComment
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}