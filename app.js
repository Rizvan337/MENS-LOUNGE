const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    res.send("Hello")
})








app.listen(3010,()=>{
    console.log("Port is running");
    
})