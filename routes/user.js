const { Router } = require('express')
const router = Router()
const profile = require('../middlewares/profilepicture')
const blogpic=require('../middlewares/blogpicture')
const authentication = require('../middlewares/authentication')
const { signupcontroller, signincontroller } = require('../controllers/user')
const { homeblogdatacontroller, likeblogcontroller,commentblogcontroller} = require('../controllers/blog')

router.post('/signup', profile, signupcontroller);
router.post('/signin', signincontroller);
router.post('/home', authentication ,blogpic,homeblogdatacontroller)
router.post('/blog/:id/like', authentication, likeblogcontroller)
router.post('/blog/:id/comment',authentication,commentblogcontroller)

module.exports = router
