const router = require('express').Router()
const passport = require('passport')
const userController = require('../controller/user_controller') 

router.post('/signIn', userController.signIn); 
router.post('/createUser', userController.createUser);
router.get('/getUser/:email',passport.authenticate(`jwt`,{session:false}), userController.getUser); 

module.exports = router;