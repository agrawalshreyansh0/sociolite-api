const router = require('express').Router();
const friendController = require('../controller/friend_controller');

router.post('/sendRequest', friendController.sendRequest);
router.post('/acceptRequest', friendController.acceptRequest);

module.exports = router; 