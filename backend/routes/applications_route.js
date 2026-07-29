const express=require('express');
const router=express.Router();
const protect=require('../middleware/auth')
const {applyjob,get_app,get_applicants,update_status}=require('../controllers/application');

router.post('/:jobid/apply',protect,applyjob);
router.get('/my',protect,get_app);
router.get('/:jobid/applicants',protect,get_applicants);
router.put('/:applicationid/status',protect,update_status);

module.exports=router