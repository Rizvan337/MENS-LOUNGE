const User = require('../../models/userSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const loadLogin = async (req,res)=>{
    try {
       return res.render('admin-login')
    } catch (error) {
        console.log("Admin page error",error)
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const admin = await User.findOne({isAdmin:true,email})
        if(admin) {
            const passwordMatch = await bcrypt.compare(password,admin.password)
        if(passwordMatch) {
            req.session.admin = true
        return res.redirect('/admin/dashboard')
}else{
    return res.render('admin-login')
}
}else{
            return res.render('admin-login')

        }
    } catch (error) {
        console.error("Login error",error)
    }
} 


const loadDashboard = async (req,res)=>{
    try {
if(req.session.admin){
    return res.render('dashboard')
}
     
    } catch (error) {
        
    }
}

module.exports = {
    loadLogin,
    login,
    loadDashboard,
}