const express=require('express');
const router=express.Router();
const protect = require('../middleware/auth');
const {signup,login,me}=require('../controllers/authc');
router.post('/signup',signup);
router.post('/login', login);
router.get('/me', protect, me);
module.exports=router;