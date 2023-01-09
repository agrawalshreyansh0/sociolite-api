const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('posts', postsSchema); 