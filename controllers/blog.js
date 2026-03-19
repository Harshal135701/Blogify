const userModel = require('../models/user')
const blogSchema = require('../models/blog')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const blog = require('../models/blog');

async function homeblogdatacontroller(req, res) {
    try {
        const { blogtitle, blogcontent } = req.body;
        if (!blogtitle || !blogcontent) {
            return res.status(400).render('home', {
                error: "Error while blog creation",
                user: req.user
            })
        }

        let blogpicture;

        if (req.file) {
            blogpicture = '/uploads/blogs/' + req.file.filename;
        }

        await blogSchema.create({
            createdby: req.user._id,
            blogtitle,
            blogcontent,
            blogpicture
        })
        res.redirect('/home')
    }
    catch (err) {
        return res.render('home', {
            error: err.message,
            user: req.user
        })
    }
}

async function likeblogcontroller(req, res) {
    try {
        const { id } = req.params;
        const blogIs = await blogSchema.findById(id);
        if (!blogIs) {
            return res.status(400).render('blogNotFound');
        }
        if (!blogIs.likedBy) {
            blogIs.likedBy = [];
        }
        // Some method use to find perticular data is in document or not 
        const userLikedBlogOrNot = blogIs.likedBy.some((userid) =>
            userid.toString() === req.user._id.toString()
        )
        // filter method use to modify the data like keep it or remove it 
        if (userLikedBlogOrNot) {
            blogIs.likedBy = blogIs.likedBy.filter((userid) =>
                userid.toString() !== req.user._id.toString()
            )
        }
        else {
            blogIs.likedBy.push(req.user._id);
        }
        blogIs.likes = blogIs.likedBy.length;
        await blogIs.save();

        return res.redirect('/blog/' + id);
    }
    catch (err) {
        return res.status(400).render('blogNotFound')
    }
}


async function commentblogcontroller(req, res) {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const user = req.user._id;
        const blogIs = await blogSchema.findById(id);
        if (!blogIs) {
            return res.status(400).render('blogNotFound')
        }
        blogIs.comments.push({
            user,
            text,
        })
        await blogIs.save();
        return res.redirect('/blog/' + id);
    }
    catch (err) {
        return res.status(400).render('blogNotFound');
    }
}

module.exports = {
    homeblogdatacontroller,
    likeblogcontroller,
    commentblogcontroller
}