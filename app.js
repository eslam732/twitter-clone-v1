const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const authRouts=require('./routes/auth');

const app=express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


console.log('here');
  app.use('/auth',authRouts);
  
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data=error.data;
    res.status(status).json({ message: message,data :data});
  });

mongoose.connect('mongodb+srv://eslam:eslam123@cluster0.7q1oh.mongodb.net/train?retryWrites=true&w=majority')
.then(result=>{
    app.listen(9090);
    console.log('connected');
});