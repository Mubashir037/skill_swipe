const express=require('express')
const router=express.Router();
const protect=require('../middleware/auth');
const{create_job,getjobs,getjobbyid,update_job,deletejob}=require('../controllers/job');
router.post('/', protect, create_job);
router.get('/', getjobs);
router.get('/:id', getjobbyid);
router.put('/:id', protect, update_job);
router.delete('/:id', protect, deletejob);
module.exports = router;