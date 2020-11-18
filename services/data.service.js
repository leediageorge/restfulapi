const db = require('./db');

let accountDetails={
    1:{Username:"user1", firstname:"KeVIN", lastname:"Antony", phoneno:5623412541 ,pincode:123454},
    2:{Username:"user2", firstname:"Minu", lastname:"Mathew", phoneno:9947886978 ,pincode:684545},
    3:{Username:"user3", firstname:"Arun", lastname:"Johns", phoneno:7561857598 ,pincode:653412},
    4:{Username:"user4", firstname:"Ram", lastname:"mohan", phoneno:9745044927 ,pincode:657894},
    5:{Username:"user5", firstname:"Sonia", lastname:"George", phoneno:9823412541 ,pincode:123654},
    
    
}
let currentUser;

const register = (Username,firstname,lastname,phoneno,Adress,pincode)=>{
    return db.User.find({
      firstname:firstname,
      Username:lastname
    })
    .then(user=>{
      if(user){
        return {
          status:false,
          statusCode:422,
          message:'User already exists. Please login'
        }
      }
      const newUser = new db.User({
        Username,
        firstname,
        lastname,
        phoneno,
        Adress,
        pincode

          });
      newUser.save();
      return {
        status:true,
        statusCode:200,
        message:'User created successfully. Please login'
      };
    });
}
module.exports={
    register}