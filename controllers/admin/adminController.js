const User = require('../../models/userSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const loadLogin = async (req,res)=>{
    try {
        res.render('admin-login')
    } catch (error) {
        console.log("Admin page error",error)
    }
}

module.exports = {
    loadLogin,
}