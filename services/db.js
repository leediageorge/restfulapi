const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restfulapi', {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const User = mongoose.model('User',{
    Username: String,
    firstname: String,
    lastname: String,
    phoneno: Number,
    Adress: String,
    pincode: Number,
    
});

module.exports = {
    User
}