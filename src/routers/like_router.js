const router = require('express').Router()
const likeController = require('../controller/like_controller')

router.post('/toggleLike', likeController.toogleLike); 


module.exports = router; 