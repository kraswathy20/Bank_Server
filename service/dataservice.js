const jwt=require('jsonwebtoken')
userDetails={
      1000:{acno:1000,username:"anu",password:"abc123",balance:0,transaction:[]},
      1001:{acno:1001,username:"amal",password:"abc123",balance:0,transaction:[]},
      1003:{acno:1003,username:"arun",password:"abc123",balance:0,transaction:[]},
      1004:{acno:1004,username:"akhil",password:"abc123",balance:0,transaction:[]}
    }

    register=(uname,acno,psw)=>{
      if(acno in userDetails){
        return {
          status:false,
          message:"User already exist",
          statusCode:401
        }
      }
      else{
        userDetails[acno]={acno,username:uname,password:psw,balance:0,transaction:[]}
        // console.log(this.userDetails);
        return {
          status:true,
          message:"Registered Successfully",
          statusCode:200
        }
      }
    
    }


    login=(acno,psw)=>{
        if(acno in userDetails){
          if(psw==userDetails[acno]["password"]){
            currentUser=userDetails[acno]["username"]
            // alert("login Successfull!!")
    
            currentAcno=acno

            const token=jwt.sign({currentAcno},"supersecretkey123")

            return {
              status:true,
              message:"Login Successfully",
              statusCode:200,
              currentUser,
              currentAcno,
              token
            }
          }
          else{
            return {
              status:false,
              message:"incorrect Password",
              statusCode:401
            }
          }
    
        }
        else{
          return {
            status:false,
            message:"User not found.register please!!",
            statusCode:401
          }
        }
        
    }
    
    deposit=(acnum,password,amount)=>{
      // convert string to integer
      var amnt=parseInt(amount)
      if(acnum in userDetails){
        if(password==userDetails[acnum]["password"]){
          // update balance
          userDetails[acnum]["balance"]+=amnt
    
          // transaction data store
          userDetails[acnum]["transaction"].push({Type:"CREDIT",amount:amnt})
    
    
          // return current balance
          // return userDetails[acnum]["balance"]
          return {
            status:true,
            message:`your account has been credited with amount ${amnt} and your current balance is ${userDetails[acnum]["balance"]}`,
            statusCode:200
          }
        }
        else{
          return {
            status:false,
            message:"Incorrect password",
            statusCode:401
          }
        }
      }
      else{
        return {
          status:false,
          message:"Incorrect accnt number",
          statusCode:401
        }
      }
    }


    withdraw=(acnum,password,amount)=>{
      // inorder to avoid calling this.userDetails
      // convert string to integer
      var amnt=parseInt(amount)
      if(acnum in userDetails){
        if(password==userDetails[acnum]["password"]){
          if(amnt<=userDetails[acnum]["balance"]){
            // update balance
          userDetails[acnum]["balance"]-=amnt
    
          userDetails[acnum]["transaction"].push({Type:"DEBIT",amount:amnt})
            console.log(userDetails);
            
            // return current balance
          // return userDetails[acnum]["balance"]
          return{
            status:true,
            message:`your account has been debited with amount ${amnt} 
            and your current balance is ${userDetails[acnum]["balance"]}`,
            statusCode:200
          }
          }
          else{
            return {
              status:false,
              message:"Insufficient Balance",
              statusCode:401
            }
          }
          
        }
        else{
          return {
            status:false,
            message:"Incorrect password",
            statusCode:401
          }
        }
      }
      else{
        return {
          status:false,
          message:"Incorrect Accnt Number",
          statusCode:401
        }
      }
    }

    getTransaction=(acno)=>{
      // return userDetails[acno]["transaction"]
      return{
        status:true,
        statusCode:200,
        transaction:userDetails[acno]["transaction"]
      }
    }

  module.exports={
    register,login,deposit,withdraw,getTransaction
  }