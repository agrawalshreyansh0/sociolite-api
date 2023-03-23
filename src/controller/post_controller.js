const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.createPost = async (req, res) => {
  try {
    await Post.create(req.body);
    console.log(`new post created by :${req.body.email}`);
    return res.json({ success: true, message: "Post created" });
  } catch (err) {
    console.log(`error : `, err);
    return res.json({ success: false, message: "Error in creating the post" });
  }
};

//paginate
module.exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)
      .populate("user")
      .populate({ path: "likes", populate: { path: "user" } })
      .populate({ path: "comments", populate: { path: "user" } })
      .populate({
        path: "comments",
        populate: { path: "likes", populate: { path: "user" } },
      })
      .exec();

    console.log(`got all posts`);
    return res.json({ success: true, posts });
  } catch (error) {
    console.log(`error : `, error);
    return res.json({ success: false, message: "Error in getting all posts" });
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const reqpost = await Post.findById(req.params.id);
    await Like.deleteMany({ postId: req.params.id });
    await Comment.deleteMany({ post: req.params.id });
    await reqpost.remove();
    console.log(`Post Delelted with all the comments and likes`);
    return res.json({ success: true, message: "Post Deleted Successfully" });
  } catch (err) {
    console.log(`error : `, err);
    return res.json({ success: false, message: "Error Detected" });
  }
};
