const applications=require('../models/applications');
const protect=require('../middleware/auth')
const User=require('../models/user')
const Jobs=require('../models/job')

//apply job
const applyjob=async(req,res)=>{
    try{
        const userid=req.user._id;
        const jobid=req.params.jobid;
        //const status=req.params.status;
        const user=await User.findById(userid);
        const job=await Jobs.findById(jobid);
        if(!user)
        {
            return res.status(401).json({
                message:"user not found"
            });
        }
        if(!job)
        {
            return res.status(401).json({
                message:"job not found"
            });
        }
         // NEW: check if this user already applied to this job
        const existing = await applications.findOne({ userid, jobid });
        if (existing) {
            return res.status(400).json({ message: "you have already applied to this job" });
        }
       const app=await applications.create({
            userid,jobid
        })
        res.status(200).json({
            message:"application created",
            app
        });


    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}


//get_my _App=
const get_app=async (req,res)=>{
    try{
        const userid=req.user._id;
       // const jobid=req.params.jobid;
        const user=await User.findById(userid);
       // const job=await Jobs.findById(jobid);
        //const app=applications.findById(userid);
        if(!user){
            return res.status(404).json({
                message:"user not found"

            });

        }
               

         //const app=await applications.find({userid:userid});
         const app = await applications.find({ userid: userid }).populate('jobid', 'jobrole salary');
       res.status(200).json({
    message: "applications found",
    applications: app
});



    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
//get application for job
const get_applicants = async (req, res) => {
    try {
        const jobid = req.params.jobid;

        const job = await Jobs.findById(jobid);
        if (!job) {
            return res.status(404).json({ message: "job not found" });
        }

        // ownership check — same as update_job/deletejob
        if (job.postedby.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "forbidden" });
        }

        const apps = await applications.find({ jobid: jobid });

        res.status(200).json({
            message: "applicants found",
            applicants: apps
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const update_status = async (req, res) => {
    try {
        const applicationid = req.params.applicationid;
        const { status } = req.body;

        const application = await applications.findById(applicationid);
        if (!application) {
            return res.status(404).json({ message: "application not found" });
        }

        const job = await Jobs.findById(application.jobid);
        if (job.postedby.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "forbidden" });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            message: "status updated",
            application
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports={applyjob,get_app,get_applicants,update_status}