const express = require('express');
const multer = require('multer');
const router = express.Router();
const { startChatCtrl, sendMsgCtrl, getAllChatSessionCtrl } = require('../controller/chatController')

router.post('/:other_user_id', multer().none(), startChatCtrl);
router.post('/:chat_id/message', multer().none(), sendMsgCtrl );
router.get('/:your_user_id', getAllChatSessionCtrl)
router.get('/:chat_id/message', )

module.exports = router;