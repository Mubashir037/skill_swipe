const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const authroute=require('./routes/auth');
const job_route=require('./routes/jobs');
const app_route=require('./routes/applications_route');
require('dotenv').config()   
const app=express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://skill-swipe-tiu3.vercel.app']
}));



//connecting db

mongoose.connect(process.env.MONGO_URI).
then(()=>console.log("db connected")).
catch(err=>console.log("db error", err));

//server checking
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});



//routes

app.use('/api/auth', authroute);
app.use('/api/jobs',job_route);
app.use('/api/application',app_route)


