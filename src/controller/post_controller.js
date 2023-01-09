const Post = require('../models/post');
const Comment = require('../models/comment'); 

module.exports.createPost = async (req, res) => {
    try {
        await Post.create(req.body);
        console.log(`new post created by :${req.body.email}`);
        return res.json({ success: true, message: "Post created" });
    } catch (err) {
        console.log(`Error in creating the post`);
        return res.json({ success: false, message: "Error in creating the post" });
    }
}

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user').exec();
        console.log(`got all posts`);
        return res.json({ success: true, posts });
    } catch (error) {
        console.log(`Error in getting all posts`);
        return res.json({ success: false, message: "Error in getting all posts" });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const reqpost = await Post.findById(req.params.id);
        await Comment.deleteMany({ post: req.params.id }); 
        reqpost.remove(); 
        console.log(`Post Delelted with all the comments`); 
        return res.json({ success: true, message: "Post Deleted Successfully" });
    } catch (err) {
        console.log(`Error Detected`); 
        return res.json({ success: false, message: "Error Detected" });
    }
}