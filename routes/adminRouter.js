const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin/adminController')
const { adminAuth } = require('../middlewares/auth')
const customerController = require('../controllers/admin/customerController')

//Login management

router.get('/login',adminController.loadLogin)
router.post('/login',adminController.login)
router.get('/dashboard',adminAuth,adminController.loadDashboard)
router.get('/logout',adminController.logout)

//user management

router.get('/users',adminAuth,customerController.customerInfo)
router.get('/blockCustomer',adminAuth,customerController.blockUser)
router.get('/unblockCustomer',adminAuth,customerController.unBlockUser)

//category management






module.exports = router