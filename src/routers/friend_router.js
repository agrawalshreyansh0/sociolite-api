const router = require('express').Router();
const friendController = require('../controller/friend_controller');

router.post('/sendRequest', friendController.sendRequest);
router.post('/acceptRequest', friendController.acceptRequest);
router.post('/deleteRequest', friendController.deleteRequest); 
router.post('/getProfile', friendController.getUserById); 
router.post('/unfriend', friendController.unfriend); 

module.exports = router; 