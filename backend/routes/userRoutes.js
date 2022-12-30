const express=require('express');
const router=express.Router();
const {registerUser,loginUser}=require('../controllers/userController');

//registerUser and loginUser are the controllers for '/' and '/login' resp..
router.post('/',registerUser);

router.post("/login",loginUser);


module.exports= router;