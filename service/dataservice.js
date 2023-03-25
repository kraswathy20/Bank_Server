const jwt = require("jsonwebtoken");
const db = require("./db.js");
// userDetails={
//       1000:{acno:1000,username:"anu",password:"abc123",balance:0,transaction:[]},
//       1001:{acno:1001,username:"amal",password:"abc123",balance:0,transaction:[]},
//       1003:{acno:1003,username:"arun",password:"abc123",balance:0,transaction:[]},
//       1004:{acno:1004,username:"akhil",password:"abc123",balance:0,transaction:[]}
//     }

register = (uname, acno, psw) => {
  // if(acno in userDetails){
  // here our collection name is the model name itself(User),whatever done in the model
  // will be affected by the collection
  // server and db runs in different port number so asynchronous function call occurs
  // so in that case promise method (this) is used to access the output of fuctioncall
  // , user is a variable used to store the o/p data
  // i.e; if in case acno is present in the database then we will get an object as o/p
  // else we will get a null data.

  return db.User.findOne({ acno }).then((user) => {
    if (user) {
      return {
        status: false,
        message: "User already exist",
        statusCode: 401,
      };
    } else {
      // create a newuserobject in db
      const newuser = new db.User({
        acno,
        username: uname,
        password: psw,
        balance: 0,
        transaction: [],
      });

      // save in db

      newuser.save();

      return {
        status: true,
        message: "Registered Successfully",
        statusCode: 200,
      };
    }
  });
};

login = (acno, psw) => {
  // if(acno in userDetails){
 return db.User.findOne({ acno, password: psw }).then((user) => {
    if (user) {
      currentUser = user.username;
      currentAcno = acno;

      const token = jwt.sign({ currentAcno }, "supersecretkey123");

      return {
        status: true,
        message: "Login Successfully",
        statusCode: 200,
        currentUser,
        currentAcno,
        token,
      };
    } else {
      return {
        status: false,
        message: "Incorrect Account number or Password",
        statusCode: 401,
      };
    }
  });
};

deposit = (acnum, password, amount) => {
  // convert string to integer
  var amnt = parseInt(amount);
  // if (acnum in userDetails) {
   return db.User.findOne({acno:acnum,password}).then(user=>{
      if(user){
        user.balance+=amnt
        user.transaction.push({ Type: "CREDIT", amount: amnt })

        user.save()
        return{
          
            status: true,
            message: `your account has been credited with amount ${amnt} 
                       and your current balance is ${user.balance}`,
            statusCode: 200,
          
        }
      }
      else{
        return {
          status: false,
          message: "Incorrect Account Number or password",
          statusCode: 401,
        }

      }
    })
    };

withdraw = (acnum, password, amount) => {
  // inorder to avoid calling this.userDetails
  // convert string to integer
  var amnt = parseInt(amount);
  // if (acnum in userDetails) {
    return db.User.findOne({acno:acnum,password}).then(user=>{
      if(user){
        if(amnt<=user.balance){
          user.balance-=amnt
          user.transaction.push({ Type: "DEBIT", amount: amnt })

          user.save()
          return{
            status: true,
            message: `your account has been debited with amount ${amnt} 
            and your current balance is ${user.balance}`,
            statusCode: 200
          }
        }
        else{
          return {
            status: false,
            message: "Insufficient Balance",
            statusCode: 401,
          }
        }
      }
      else{
        return {
          status: false,
          message: "Incorrect accnt number or password",
          statusCode: 401,
        }
      }
    })
  }
getTransaction = (acno) => {
  return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        transaction: user.transaction,
      }
    }
    
  })
}
  // return userDetails[acno]["transaction"]
 

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
};
