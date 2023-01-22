const mongoose = require('mongoose')

const friendSchema = mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user'
    }, 
    toUser: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('friend', friendSchema); 


