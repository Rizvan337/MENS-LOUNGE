const User = require('../../models/userSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const loadLogin = async (req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.error("Login page rendering error",error)
    }
}


const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({isAdmin:0,email})
        if(!user) return res.render('login',{message:"No user found"})
         if(user.isBlocked) return res.render('login',{message:"User is blocked by admin"})
        const passwordMatch = await bcrypt.compare(password,user.password)
    
        if(!passwordMatch) return res.render('login',{message:"Password is incorrect"})
       req.session.user = user._id

       return  res.render('home')
    } catch (error) {
        console.error("Login error",error)
    }
}

const loadHomePage = async (req,res)=>{
    try {
        res.render('home')
    } catch (error) {
        
    }
}



const loadSignup = async (req,res)=>{
    try {
        res.render('signup')
    } catch (error) {
        
    }
}


const securePassword = async (password)=>{
    try {
       const passwordHash = await bcrypt.hash(password,10)
    return passwordHash
    } catch (error) {
        console.error("Password hashing error",error)
        throw error
    }
}

const signup = async (req,res)=>{
    try {
        const {name,email,password,cPassword} = req.body
        if(password!=cPassword){
            return res.render('signup',{message:"Password do not match"})
        }
        const findUser = await User.findOne({email})
        if(findUser){
            return res.render('signup',{message:"User Already Exists"})
        }
        const passwordHash = await securePassword(password)
        console.log("hashed:", passwordHash)
        const saveUserData = new User({
            name:name,
            email:email,
            password:passwordHash
        })
        await saveUserData.save()
        console.log("hashed:", saveUserData)
        req.session.user = saveUserData._id
        return res.render('login')
    } catch (error) {
        console.error("Signup error",error)
        return res.render('error',{message:"Signup failed. please try again later"})
    }
}



module.exports = {
    loadLogin,
    login,
    loadHomePage,
    loadSignup,
    signup,
}