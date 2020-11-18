const express = require('express');
const dataService = require('./services/data.service');
const session = require('express-session')
const cors = require('cors');

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(session({
    secret:'randomsecurestring',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

const logMiddleware = (req,res,next) => {
    console.log(req.body);
    next();
};
//app.use(logMiddleware);

const authMiddleware = (req,res,next) => {
    if(!req.session.currentUser){
        return res.status(401).json({
          status:false,
          statusCode:401,
          message:'Please login'
        });
    }else{
        next();
    }
};


app.post('/register', (req,res)=>{
    dataService.register(req.body.Usename,req.body.firstname,req.body.lastname,req.body.phoneno,req.body.Adress,req.body.pincode)
    .then(result=>{
        res.status(result.statusCode).json(result);
    });
    //res.status(200).send("success");
    //res.status(result.statusCode).json(result);
})

app.get('/register', authMiddleware, (req,res)=>{
    dataService.register(req)
    .then(result=>{
        res.status(result.statusCode).json(result);
    });
})

app.delete('/register/:id', authMiddleware,(req,res)=>{
    dataService.deleteTransaction(req,req.params.id)
    .then(result=>{
        res.status(result.statusCode).json(result);
    });
})

app.put('/', (req,res)=>{
    res.send("Put Method");
})

app.patch('/', (req,res)=>{
    res.send("Patch Method");
})

app.delete('/', (req,res)=>{
    res.send("Delete Method");
})

const port = 4000;
app.listen(port, ()=>{
    console.log("Server started at port "+port);
})
