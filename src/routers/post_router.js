const router = require('express').Router()
const postController = require('../controller/post_controller');

router.post('/createPost', postController.createPost);
router.get('/allPosts', postController.getAllPosts);

module.exports = router; 