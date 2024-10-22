const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin/adminController')

//Login management

router.get('/login',adminController.loadLogin)











module.exports = router