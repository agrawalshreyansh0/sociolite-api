const router = require('express').Router();
const friendController = require('../controller/friend_controller');

router.post('/sendRequest', friendController.sendRequest);
router.post('/acceptRequest', friendController.acceptRequest);
router.post('/deleteRequest',friendController.deleteRequest); 

module.exports = router; 