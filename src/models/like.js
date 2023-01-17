const mongoose = require('mongoose')
const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    likable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refpath: 'onModel'
    },
    onModel: {
        type: String,
        required: true, enum: ['post', 'comment']
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref:'post'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('like', likeSchema); 