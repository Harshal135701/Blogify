const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: {
        type: Number,
        default: 0
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogtitle: {
        type: String,
        required: true
    },
    blogcontent: {
        type: String,
        required: true,
        trim: true
    },
    blogpicture: {
        type: String,
        default: '/uploads/blogs/blogdefault.jpeg'
    },
}, { timestamps: true })

module.exports = mongoose.model('blog', blogSchema)