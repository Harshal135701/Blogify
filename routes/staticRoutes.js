const { Router } = require('express')
const router = Router()
const userModel = require('../models/user')
const blogSchema = require('../models/blog')
const authentication = require('../middlewares/authentication')
const blogpic = require('../middlewares/blogpicture')
const authorization = require('../middlewares/authorization')

router.get('/', (req, res) => {
    res.render('signup')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/signin', (req, res) => {
    res.render('signin')
})

router.get('/home', authentication, blogpic, (req, res) => {
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

router.get('/aboutus', (req, res) => {
    res.render('aboutus')
})


router.get('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blogIs = await blogSchema.findById(id);
        if (!blogIs) {
            return res.status(404).render('blogNotFound');
        }
        return res.status(200).render('fullblog', {
            blog: blogIs
        })
    }
    catch (err) {
        return res.status(400).render('blogNotFound');
    }

})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.redirect('/signin')
})

router.get('/blog/:id/edit',authentication,authorization,async(req,res)=>{
    const blogIs=await blogSchema.findById(req.params.id);
    res.render('editblog',{blog:blogIs});
})

module.exports = router