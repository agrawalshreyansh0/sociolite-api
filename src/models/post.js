const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'like'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('post', postsSchema); 