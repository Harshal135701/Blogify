const jwt = require('jsonwebtoken')
const userModel=require('../models/user')

async function authentication(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.redirect('/signin')
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decode.id)
        if(!user){
            return res.redirect('/signin')
        }
        req.user=user
        next()
    }
    catch(err){
        res.redirect('/signin');
    }
}
module.exports=authentication