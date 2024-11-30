const express = require('express');
const multer = require('multer');
const router = express.Router();
const { startChatCtrl } = require('../controller/chatController')

router.post('/:other_user_id', multer().none(), startChatCtrl);
router.post('/:id/message', )
router.get('/', )
router.get('/:id/message', )

module.exports = router;