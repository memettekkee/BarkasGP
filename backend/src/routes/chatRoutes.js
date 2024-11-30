const express = require('express');
const multer = require('multer');
const router = express.Router();
const { startChatCtrl, sendMsgCtrl } = require('../controller/chatController')

router.post('/:other_user_id', multer().none(), startChatCtrl);
router.post('/:chat_id/message', multer().none(), sendMsgCtrl );
router.get('/', )
router.get('/:id/message', )

module.exports = router;