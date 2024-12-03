const express = require('express');
const { verifyToken } = require('../middleware/authToken');
// const multer = require('multer');
const multer = require('../middleware/uploadImages')
const bucketUpload = require('../utils/uploadToBucket')
const { registerCtrl, loginCtrl, getUserbyidCtrl, updateProfilCtrl, getDashboardById } = require('../controller/userController');
const router = express.Router();

router.post('/register', multer.single("user_img"), bucketUpload.uploadToBucket, registerCtrl);
router.post('/login', multer.none(), loginCtrl);
router.get('/profile/:id', getUserbyidCtrl);
router.put('/profile/:id', verifyToken, multer.single("user_img"), bucketUpload.uploadToBucket, updateProfilCtrl);
router.get('/dashboard/:id', getDashboardById)

module.exports = router;