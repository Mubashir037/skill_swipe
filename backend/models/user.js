const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    userid:{
        type:String,required:true,unique:true

    },
    username:{
        type:String,required:true

    },
    contact:{
        type:String,required:true
    },
    email:{
        type:String,required:true,unique:true
    },
      password: {
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type:String,
        enum:['seeker','recruiter'],
       // default:'user'
    }

}, {timestamps:true})
module.exports=mongoose.model('user',userschema)