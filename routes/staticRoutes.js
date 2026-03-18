const { Router } = require('express')
const router = Router()
const userModel = require('../models/user')
const blogSchema = require('../models/blog')
const authentication = require('../middlewares/authentication')

router.get('/', (req, res) => {
    res.render('signup')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/signin', (req, res) => {
    res.render('signin')
})

router.get('/home', authentication, (req, res) => {
    res.render('home', { user: req.user });
})

router.get('/myblogs', authentication, async (req, res) => {
    const blogs = await blogSchema.find({ createdby: req.user._id })
    res.render('myblogs', {
        user: req.user,
        blogs
    }
    )
})

router.get('/allblogs', authentication, async (req, res) => {
    const blogs = await blogSchema.find({})
    res.render('allblogs', {
        blogs
    }
    )
})

router.get('/aboutus',(req,res)=>{
    res.render('aboutus')
})


module.exports = router