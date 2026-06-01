const express = require('express');
const jwt = require("jsonwebtoken");
const router = express. Router() ;
const userModel = require(" .. /models/user.model");
const authmiddleware = require('../middleware/auth.middleware');

/* POST /api/posts [protected] {img-file}*/
router.post('/',
    authmiddleware, /*req.user= userData */
    upload.single("image"),
    createPostController)


module.exports=router;