const express = require('express')
const router = express.Router()
const userController = require('../controllers/user/userController')



router.get('/login',userController.loadLogin)
router.post('/login',userController.login)
router.get('/',userController.loadHomePage)

router.get('/signup',userController.loadSignup)
router.post('/signup',userController.signup)





router.get('/logout',userController.logout)
module.exports = router