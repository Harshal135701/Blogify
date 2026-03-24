const { Router } = require('express')
const router = Router()
const profile = require('../middlewares/profilepicture')
const blogpic = require('../middlewares/blogpicture')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const { signupcontroller, signincontroller } = require('../controllers/user')
const { homeblogdatacontroller, likeblogcontroller, commentblogcontroller, handletheupdateddatacontroller,deleteblogcontroller } = require('../controllers/blog')

router.post('/signup', profile, signupcontroller);
router.post('/signin', signincontroller);
router.post('/home', authentication, blogpic, homeblogdatacontroller)
router.post('/blog/:id/like', authentication, likeblogcontroller)
router.post('/blog/:id/comment', authentication, commentblogcontroller)
router.put('/blog/:id', authentication, authorization, handletheupdateddatacontroller);
router.delete('/blog/:id',authentication,authorization,deleteblogcontroller)


module.exports = router
