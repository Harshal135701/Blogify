const userModel = require('../models/user')
const blogModel = require('../models/blog')

async function authorization(req, res, next) {
    try {
        const userId = req.user._id;
        const blogId = req.params.id;

        const blogIs = await blogModel.findById(blogId);
        if (!blogIs) {
            return res.status(404).render('blogNotFound');
        }
        if (req.user.role === 'admin') return next();
        if (blogIs.createdby.toString() !== userId.toString()) {
            return res.status(403).send("You don't have permission to make any type of changes in this blog");
        }
        next();
    }
    catch (err) {
        console.error(err)
        return res.status(500).render('blogNotFound')
    }
}

module.exports = authorization;