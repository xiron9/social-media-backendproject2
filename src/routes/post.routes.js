const express = require('express');
const jwt = require("jsonwebtoken");
const router = express. Router() ;
const userModel = require("../models/user.model");
const authmiddleware = require('../middleware/auth.middleware');
const multer=require('multer');
const { createPostController, extractTagsController } = require("../controllers/post.controller");

const upload = multer( { storage : multer.memoryStorage() })



/* POST /api/posts [protected] {img-file}*/
router.post('/',
    authmiddleware, /*req.user= userData  next s agge push krdega */ 
    upload.single("image"),
    createPostController)

/* POST /api/posts/extract-tags [public] {img-file}*/
router.post('/extract-tags',
    upload.single("image"),
    extractTagsController)

module.exports = router;