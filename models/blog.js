const mongoose = require('mongoose')

const blogSchema=mongoose.Schema({
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    blogtitle:{
        type:String,
        required:true
    },
    blogcontent:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

module.exports=mongoose.model('blog',blogSchema)