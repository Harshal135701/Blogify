const mongoose = require('mongoose')

async function connectdb(req, res) {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/bloggingapplicationdb')
        console.log('The db is connected')
    }
    catch(err){
        console.error(err);
    }
}
module.exports=connectdb