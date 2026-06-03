const postModel=require("../models/post.model");
const generateCaption=require("../service/ai.service");

async function createPostController(req,res){
    const file=req.file;
    console.log("file received:",file);

    const base64Image=new Buffer.from(file.buffer).toString('base64');

    const caption=await generateCaption(base64Image);

    res.json({
        caption
    })
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

module.exports = {createPostController, extractTagsController};