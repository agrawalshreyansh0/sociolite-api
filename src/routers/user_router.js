const router = require('express').Router()
const passport = require('passport')
const userController = require('../controller/user_controller');
const user = require('../models/user');
const auth = require('../config/auth');

router.post('/signIn', userController.signIn);
router.post('/createUser', userController.createUser);
router.get('/getUserData', auth, userController.getUserData);
router.get('/validateToken', auth, userController.validateToken);
router.post('/updateUser', userController.updateUser);

//extras for dev use
router.get('/getUser/:email', passport.authenticate(`jwt`, { session: false }), userController.getUser);
router.get('/allUsers', userController.getAllUsers);

module.exports = router;