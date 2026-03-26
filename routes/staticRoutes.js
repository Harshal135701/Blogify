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
    try {

        const category = req.query.category;

        const blogsCountArr = await blogSchema.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ])

        const blogCount = {}

        blogsCountArr.forEach(element => {
            blogCount[element._id] = element.count
        });

        const blogs = await blogSchema.find({ createdby: req.user._id })
        return res.render('myblogs', {
            user: req.user,
            blogs,
            blogCount,
            category
        }
        )
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get('/allblogs', authentication, async (req, res) => {
    try {

        const category = req.query.category;

        const blogsCountArr = await blogSchema.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ])

        const blogCount = {}

        blogsCountArr.forEach(element => {
            blogCount[element._id] = element.count
        });

        const blogs = await blogSchema.find({})
        return res.render('allblogs', {
            blogs,
            blogCount,
            category
        }
        )
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
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

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/signin')
})

router.get('/blog/:id/edit', authentication, authorization, async (req, res) => {
    const blogIs = await blogSchema.findById(req.params.id);
    res.render('editblog', { blog: blogIs });
})

router.get("/blogs", authentication, async (req, res) => {
    try {
        const { category, search } = req.query;

        // here we are couting the category of blogs using group aggregate 
        const blogsCountArr = await blogSchema.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        // We are converting arr to obj
        const blogCount = {};
        blogsCountArr.forEach(el => {
            blogCount[el._id] = el.count;
        });

        let query = {};

        if (category) {
            query.category = category;
        }

    //    $text -> the searching based on text 
    // $seach -> what to search 
        if (search) {
            query.$text = { $search: search };
        }

        const blogs = await blogSchema.find(query);

        return res.render("allblogs", {
            blogs,
            blogCount,
            category
        });

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router