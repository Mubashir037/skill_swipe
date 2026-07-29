const express=require('express');
const mongoose=require('mongoose')
const authroute=require('./routes/auth');
const job_route=require('./routes/jobs');
const app_route=require('./routes/applications_route');
require('dotenv').config()   
const app=express();
app.use(express.json());




//connecting db

mongoose.connect(process.env.MONGO_URI).
then(()=>console.log("db connected")).
catch(err=>console.log("db error", err));

//server checking

app.listen(5000,()=>{
console.log("server is listening on port 5000")
})

//routes

app.use('/api/auth', authroute);
app.use('/api/jobs',job_route);
app.use('/api/application',app_route)


