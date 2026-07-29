
const Jobs=require('../models/job');

//create job
const create_job=async(req,res)=>{
    try{
        const {jobdescription,jobrole,salary}=req.body;
        const job = await Jobs.create({
    jobdescription,
    jobrole,
    salary,
    postedby: req.user._id
});
            res.status(200).json({
                message:"job cretaed successfully",
                job
            });

        } catch(error){
            res.status(500).json({
                error:error.message
            });
        }

    }
//getjobs
const getjobs=async(req,res)=>{
    try{
       const list=await Jobs.find()
       res.status(200).json({
        message:"list ready",
        jobs:list
       });


    }
    catch(err){
        res.status(500).json({
            message:err.message
        });

    }
}   
//getjob by id
const getjobbyid=async(req,res)=>{
    try{
        const id=req.params.id;
        const job=await Jobs.findById(id)
        if(!job)
        {
            return res.status(404).json({message:"job not found"});
        }
        res.status(200).json({
            message:"job found",
            jj:job

        });
    

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
//update job
const update_job=async (req,res)=>{
    try{
        const id=req.params.id;
       const job=await Jobs.findById(id);
       if(!job)
       {
        return res.status(404).json({
            message:"job not found"
        });
       }
       if(job.postedby.toString()===req.user._id.toString()){
     const upd=await Jobs.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            message:"updated",upd
        });


       }
       else{
        return res.status(403).json({
            message:"forbidden"
        })
       }


    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
//delete job
const deletejob=async (req,res)=>{
    const id=req.params.id;
    const job=await Jobs.findById(id);
    if(!job)
    {
        return res.status(404).json({
            message:"job not found"
        });
    }
    if (job.postedby.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "forbidden" });
}
  await  Jobs.findByIdAndDelete(id);
    res.status(200).json({
        message:"deleted job"
    });

}
module.exports={create_job,getjobs,getjobbyid,update_job,deletejob};
