const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilepicture: {
        type: String,
        default: '/uploads/profiles/default.webp'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema);