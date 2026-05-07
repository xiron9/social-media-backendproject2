const express= require("express");
const userModel=require("../models/user.model")
const router=express.Router()
const jwt=require("jsonwebtoken")

/*
POST - /register
POST - /login
GET - /user[protected]

*/
//post
router.post('/register',async(req,res)=>{
    const {username,password}=req.body

   const existingUser= await userModel.findOne({
    username
   })
   if(existingUser){
    return res.status(409).json({
        message:"username already exists"
    })
   }

    const user= await userModel.create({
        username,password
    })

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

   res.cookie("token",token
  /*
  {
  expires:mew Date(Date.now()+1000*60*60*24*7),
  }
  */ 

   )

    res.status(201).json({
        message:"user created succesfully",
        user
    })
})
//login
router.post('/login', async(req,res)=>{

 const {username,password}=req.body

 const user=await userModel.findOne({
  username:username
 })

 if(!user){
    return res.status(401).json({
        message:"user account not found"
    })
 }

 const ispasswordvalid = password == user.password

 if(!ispasswordvalid){
    return res.status(401).json({
        message:"Invalid password"
    })
 }

 const token = jwt.sign(
   { id: user._id },
   process.env.JWT_SECRET
 );

 res.cookie("token", token,{
    expires:new Date(Date.now()+1000*60*60*24*7),
 });

 return res.status(200).json({
   message: "login successful",
   user
 });
})

//useragent
//protected 
router.get('user',async(req,res)=>{
    const token=req.cookie.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized token not found"
        })
    }

   try{
    //When created by our own server
  const decoded=jwt.verify(token , process.env.JWT_SECRET)

  const user=await userModel.findOne({
    _id:decoded.id
  })

  return res.status(200).json({
    message:"user data fetched successfully",
    user
  })
   }catch(err){
    res.status(401).json({
        message:"Unauthorized invalid token"
    })
   }
})


module.exports=router

