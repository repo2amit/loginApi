const express=require('express');
const bodyParser=require('body-parser');
const logger=require('morgan');
const DB=require('mongoose');


const URL="mongodb://lifehype:qwertyuiop@ds119059.mlab.com:19059/authentication-users";

const urlDesign=require('./route/users');

const app=express();
//Connect DB
DB.connect(URL,()=>{
    console.log("DB Connection Stablised");
})

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
//router
app.use('/users',urlDesign);
//Server start
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})


//url for db
//mongodb://lifehype:qwertyuiop@ds119059.mlab.com:19059/authentication-users