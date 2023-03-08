// import dataservice file
const dataService=require('./service/dataservice')

// import express

const express= require("express")

// create app using express

const app=express()

// to parse json data from req body
app.use(express.json())

// register  - post
app.post('/register',(req,res)=>{

   const result = dataService.register(req.body.uname,req.body.acno,req.body.psw)
   res.status(result.statusCode).json(result)
    // console.log(req.body);
    // res.send("Success")
})

// login
app.get('/login',(req,res)=>{

    const result = dataService.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
     // console.log(req.body);
     // res.send("Success")
 })

// Deposit
app.post('/deposit',(req,res)=>{

    const result = dataService.deposit(req.body.acnum,req.body.password,req.body.amount)
    res.status(result.statusCode).json(result)
     // console.log(req.body);
     // res.send("Success")
 })
//  withdraw
app.post('/withdraw',(req,res)=>{

    const result = dataService.withdraw(req.body.acnum,req.body.password,req.body.amount)
    res.status(result.statusCode).json(result)
     // console.log(req.body);
     // res.send("Success")
 })



// create port
app.listen(3000,()=>{console.log("server started at port number 3000");})
