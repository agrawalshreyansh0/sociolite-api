const router = require('express').Router(); 
const commentComtroller = require('../controller/comment_controller')

router.post('/createComment', commentComtroller.createComment);

module.exports = router; 