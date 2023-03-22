// import dataservice file
const dataService=require('./service/dataservice')
// import json web token
const jwt=require("jsonwebtoken")
// const jwt= require('jsonwebtoken')

// import express

const express= require("express")

// create app using express

const app=express()

// to parse json data from req body
app.use(express.json())

// middleware
const jwtMiddleware=(req,res,next)=>{
 try {const token=req.headers['access_token']
    // verify token
    const data=jwt.verify(token,"supersecretkey123")
    console.log("----------middleware----------");
    console.log(data);

    next()
}
catch {
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login first"
    })


}
}

// const jwtMiddleware=(req,res,next)=>{
//     const token=req.body.token
//     // verify token
//      const data=jwt.verify(token,"supersecretkey123")
//      console.log(data);
//      next()
// }


// register  - post
app.post('/register',(req,res)=>{

    const result=dataService.register(req.body.uname,req.body.acno,req.body.psw)
    // convert js to json and send
    res.status(result.statusCode).json(result)
    
})

// login

app.get('/login',(req,res)=>{

    const result=dataService.login(req.body.acno,req.body.psw)
    // convert js to json and send
    res.status(result.statusCode).json(result)
    
})

// Deposit
app.post('/deposit',jwtMiddleware,(req,res)=>{

    const result=dataService.deposit(req.body.acnum,req.body.password,req.body.amount)
    // convert js to json and send
    res.status(result.statusCode).json(result)
    
})
// app.post('/deposit',jwtMiddleware,(req,res)=>{

//     const result = dataService.deposit(req.body.acnum,req.body.password,req.body.amount)
//     res.status(result.statusCode).json(result)
//      // console.log(req.body);
//      // res.send("Success")
//  })
//  withdraw
app.post('/withdraw',jwtMiddleware,(req,res)=>{

    const result=dataService.withdraw(req.body.acnum,req.body.password,req.body.amount)
    // convert js to json and send
    res.status(result.statusCode).json(result)
    
})

// get transaction
app.get('/transaction',jwtMiddleware,(req,res)=>{

    const result=dataService.getTransaction(req.body.acno)
    // convert js to json and send
    res.status(result.statusCode).json(result)
    
})


//  delete

// create port
app.listen(3000,()=>{console.log("server started at port number 3000");})
