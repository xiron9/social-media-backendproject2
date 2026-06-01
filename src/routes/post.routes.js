const express = require('express');
const router=express.Router();
const authmiddleware=require("../middleware/auth.middleware")
const multer=require("multer")
// POST /api/post [protected]{img-file}
router.post('/',
    authmiddleware, /*req.user=userdata */
    upload.singel("image"),
    createPostController
)


module.exports=router;