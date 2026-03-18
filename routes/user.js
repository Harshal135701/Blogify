const { Router } = require('express')
const router = Router()
const profile = require('../middlewares/profilepicture')
const authentication = require('../middlewares/authentication')
const { signupcontroller, signincontroller,homeblogdatacontroller } = require('../controllers/user')

router.post('/signup', profile, signupcontroller);
router.post('/signin', signincontroller);
router.post('/home',authentication,homeblogdatacontroller)

module.exports = router
