const router = require("express").Router();
const chatRoomController = require("../controller/chatRoom_controller");

router.post("/getChatRoom", chatRoomController.getChatRoom);
router.post('/sendMessage', chatRoomController.sendMessage);
router.get('/getChats', chatRoomController.getChats); 

module.exports = router;
