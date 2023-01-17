const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toogleLike = async (req, res) => {
    try {
        //get id and type in the body -> likes/toggleLike/?id=adsfa&type=Post also get user from the body

        //get the likable component 
        let likable;
        let deleted = false;

        if (req.body.type == 'post') {
            likable = await Post.findById(req.body.id).populate('likes');
        } else {
            likable = await Comment.findById(req.body.id).populate('likes');
        }

        //check if the like already exists or not

        let existingLike = await Like.findOne({
            likable: req.body.id,
            onModel: req.body.type,
            user: req.body.user,
            postId: req.body.postId,
        });

        if (existingLike) {
            // remove the existing like
            likable.likes.pull(existingLike._id);
            likable.save();
            existingLike.remove();
            deleted = true;
        } else {
            // create a new like
            let newLike = await Like.create({
                user: req.body.user,
                likable: req.body.id,
                onModel: req.body.type, 
                postId: req.body.postId, 

            });
            likable.likes.push(newLike._id);
            likable.save();
        }
        console.log(`toggled a like`);
        return res.json({ success: true, data: deleted });

    } catch (error) {
        console.log(`error in creating like :`, error);
        return res.json({ success: false, message: "error in creating like" });
    }
}










