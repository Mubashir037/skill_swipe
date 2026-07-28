const mongoose=require('mongoose');
const jobschema=new mongoose.Schema({
    jobid:{
        type:String,required:true,unique:true
    },
    jobdescription:{
        type:String,required:true

    },
    jobrole:{
        type:String,required:true
    },
    salary:{
        type:Number,required:true,min:0
    },
    postedby:{
        type:mongoose.Schema.Types.ObjectId,ref:'user',
        required:true,
    }

})
module.exports=mongoose.model('job',jobschema);