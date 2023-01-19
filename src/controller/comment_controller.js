const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.createComment = async (req, res) => {
    try {
        let foundpost = await Post.findById(req.body.post);
        if (!foundpost) {
            console.log(`No such post found`);
            return res.json({ success: false, message: "No such post found" });
        }
        let newcomment = await Comment.create(req.body);
        foundpost.comments.push(newcomment);
        foundpost.commentsCount++; 
        foundpost.save();
        console.log(`comment on ${req.body.post} by ${req.body.user}`);
        return res.json({ success: true, message: "comment successfully added" });
    } catch (err) {
        console.log(`error : `, err);
        return res.json({ success: false, message: "Error Detected" });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let currComment = await Comment.findById(req.params.id);
        let currentPost = await Post.findByIdAndUpdate(currComment.post, { $pull: { comments: req.params.id } });
        currentPost.commentsCount--; 
        currentPost.save(); 
        await Like.deleteMany({ likable: currComment._id, onModel: 'comment' });
        currComment.remove();
        console.log(`Deleted the post`);
        return res.json({ success: true, message: "Deleted the post successfully" });
    } catch (error) {
        console.log(`error : `, error);
        return res.json({ success: false, message: "Error Detected" });
    }
}

module.exports.getCommentsByPostId = async (req, res) => {
    try {
        let post = await Post
            .findById(req.params.id)
            .populate({ path: 'comments', populate: { path: 'user' } })
            .exec();
        if (post) {
            let comments = post.comments;
            console.log(`got the comments`);
            return res.json({ success: true, data: comments });
        } else {
            console.log(`post not found with id : ${req.params.id}`);
            return res.json({ success: false, message: "no such post found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: `Error Detected` });
    }
}