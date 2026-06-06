const postModel=require("../models/post.model");
const generateCaption=require("../service/ai.service");

async function createPostController(req,res){
    try {
        const file=req.file;
        if (!file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const base64Image=new Buffer.from(file.buffer).toString('base64');
        const caption=await generateCaption(base64Image);

        // Save to database
        const newPost = await postModel.create({
            image: `data:${file.mimetype};base64,${base64Image}`,
            caption: caption,
            user: req.user._id
        });

        res.json({
            caption,
            post: newPost
        })
    } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
}

async function getUserPostsController(req, res) {
    try {
        const posts = await postModel.find({ user: req.user._id }).sort({ _id: -1 });
        res.json(posts);
    } catch (error) {
        console.error("Fetch posts error:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
}

async function extractTagsController(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const base64Image = new Buffer.from(file.buffer).toString('base64');
        const caption = await generateCaption(base64Image);

        res.json({
            caption
        });
    } catch (error) {
        console.error("Extraction error:", error);
        res.status(500).json({ message: "Failed to extract tags" });
    }
}

module.exports = {createPostController, extractTagsController, getUserPostsController};