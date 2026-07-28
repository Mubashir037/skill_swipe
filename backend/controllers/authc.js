const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const signup=async(req,res)=>{
    try{
        const {userid,username,email,password,contact,role,salary}=req.body;
        const exist=await User.findOne({userid});
        if(exist){
            return res.status(400).json({
                message:"user already exists"
            });
        }
        const hash=await bcrypt.hash(password,10);

        const user=await User.create({
            userid,username,email,password:hash,contact,role,salary
        });

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}


        );
        res.status(201).json({
            message:"signup successfull",token

        });


    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
}
//lgin
const login=async(req,res)=>{
    try{
        const{userid,password}=req.body;
        const user=await User.findOne({userid});
        if(!user){
           return res.status(404).json({
                message:"user not found"
            });
            
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch)
        {
           return res.status(400).json({
                message:"invalid password"
            });

        }
        const token=jwt.sign(
            {id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'}
        );
        res.json({
            message:"login successful",
            token
        });



    }
    catch(error){
        res.status(500).json({
            
                error:error.message
        
        });
    }
};

module.exports={
    signup,login
};