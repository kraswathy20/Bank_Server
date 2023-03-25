// step - 1    import mongoose

const mongoose=require("mongoose")

// step-2      state connection string
mongoose.connect('mongodb://127.0.0.1:27017/bankServer',{useNewUrlParser:true})

// model (schema) creation  (model name must be singular form of collection name
//  and first letter must be capital)

// schema means feilds and values

const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}


