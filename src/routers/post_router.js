const router = require('express').Router()
const postController = require('../controller/post_controller');

router.post('/createPost', postController.createPost);
router.get('/allPosts', postController.getPosts);
router.delete('/destroy/:id', postController.destroy);

module.exports = router; 