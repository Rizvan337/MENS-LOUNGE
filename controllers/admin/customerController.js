const User = require('../../models/userSchema')

const customerInfo = async (req,res)=>{
    try {
        let search = req.query.search || ''
        let page = parseInt(req.query.page)||1
        const limit =3
        const userData = await User.find({
            isAdmin:false,
            $or:[
                {name:{$regex:'.*' + search+'.*' , $options:'i'}},
                {email:{$regex:'.*'+search+'.*',$options:'i'}},
            ],
        }).limit(limit)
        .skip((page-1)*limit)
        .exec()

        const count = await User.countDocuments({
            isAdmin:false,
            $or:[
                {name:{$regex:'.*'+search+'.*',$options:'i'}},
                {email:{$regex:'.*'+search+'.*',$options:'i'}},
            ],
        })
console.log("rendering viewcustomers");


       return res.render('customer',{
        data:userData,
        totalPages:Math.ceil(count/limit),
        currentPage:page,
        searchQuery:search
       })
    } catch (error) {
        console.log('Error in customerInfo:', error)

    }
}



const blockUser = async (req,res)=>{
    try {
        let id = req.query.id
        await User.updateOne({_id:id},{$set:{isBlocked:true}})
        res.redirect('/admin/users')
    } catch (error) {
        
    }
}


const unBlockUser = async (req,res)=>{
   let id = req.query.id
   await User.updateOne({_id:id},{$set:{isBlocked:false}})
   res.redirect('/admin/users')
    
}


module.exports = {
    customerInfo,
    blockUser,
    unBlockUser,
}