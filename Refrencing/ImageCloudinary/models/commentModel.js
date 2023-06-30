const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    writeComment: {
        type: String,
        required: [true, 'Name is required']
    },
    
    link :{type:mongoose.Schema.Types.ObjectId,
            ref:"Book"}    
},

{timestamps:true})

const commentModel = mongoose.model('mycomment', commentSchema)

module.exports = commentModel