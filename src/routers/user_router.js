const router = require('express').Router()
const userController = require('../controller/user_controller')

router.post('/signIn', userController.signIn); 
router.post('/createUser',userController.createUser);

module.exports = router; 