const userModel = require('../models/user')
const blogSchema = require('../models/blog')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

async function signupcontroller(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).render('signup', {
                error: "Fill data correctly"
            })
        }
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.status(409).render('signup', {
                error: "Issue while signup"
            })
        }
        const bcryptedpassword = await bcrypt.hash(password, saltRounds)

        let profilepic;

        if (req.file) {
            profilepic = '/uploads/profiles/' + req.file.filename;
        }

        await userModel.create({
            username,
            email,
            password: bcryptedpassword,
            profilepicture: profilepic
        })

        return res.redirect('/signin')
    }
    catch (err) {
        res.render('signup', {
            error: err.message
        })
    }
}

async function signincontroller(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).render('signin', {
                error: "Fill data correctly"
            })
        }
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res.status(404).render('signin', {
                error: "The user not exist"
            })
        }
        const passwordCorrectOrNot = await bcrypt.compare(password, userExist.password)

        if (!passwordCorrectOrNot) {
            return res.status(404).render('signin', {
                error: "The password is incorrect"
            })
        }

        const token = jwt.sign(
            { id: userExist._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true
        })

        return res.redirect('/home')
    }
    catch (err) {
        res.render('signin', {
            error: err.message
        })
    }
}



module.exports = {
    signupcontroller,
    signincontroller,
    
}