const express= require("express");
const userModel=require("../models/user.model")
const router=express.Router()
const jwt=require("jsonwebtoken")
const {
  registerController,
  loginController,
  Userprofile,
  logout
} = require("../controllers/auth.controller");
/*
POST - /register
POST - /login
GET - /user[protected]

*/
//post
router.post('/register',registerController)
//login
router.post('/login',loginController)
//user agent
//protected 
router.get('/user',Userprofile)
router.get('/logout',logout)




module.exports=router