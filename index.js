// import express

const express= require("express")

// create app using express

const app=express()

// create request
app.get('/',(req,res)=>{
    res.send("Get Method... getting started")
})

// create request
app.post('/',(req,res)=>{
    res.send("Post Method... getting started")
})

// create request
app.patch('/',(req,res)=>{
    res.send("Patch Method... getting started")
})

// create request
app.put('/',(req,res)=>{
    res.send("Put Method... getting started")
})

// create port
app.listen(3000,()=>{console.log("server started at port number 3000");})

