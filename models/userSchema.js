const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new Schema({

name:{
    type:String,
    required:false,
},
email:{
    type:String,
    required:true,
    unique:true,
},

password:{
    type:String,
    required:false,
},
createdOn:{
    type:Date,
    default:Date.now,
},
isAdmin:{
    type:Boolean,
    default:false,    

},
isBlocked:{
    type:Boolean,
    default:false,
},
searchHistory:[{
    category:{
        type: Schema.Types.ObjectId,
        ref:"Category"
    },
    searchOn:{
        type:Date,
        default:Date.now
    }
}]



})








const User = mongoose.model("User",userSchema)
module.exports = User