const express = require('express');
const { verifyToken } = require('../middleware/authToken');
// const multer = require('multer');
const multer = require('../middleware/uploadImages')
const bucketUpload = require('../utils/uploadToBucket')
const { registerCtrl, loginCtrl, getUserbyidCtrl, updateProfilCtrl, getDashboardById, getNewsCtrl } = require('../controller/userController');
const { getSaleByUserIdCtrl } = require('../controller/saleController');
const router = express.Router();

router.post('/register', multer.none(), registerCtrl);
router.post('/login', multer.none(), loginCtrl);
router.get('/profile/:id', getUserbyidCtrl);
router.put('/profile/:id', verifyToken, multer.single("user_img"), bucketUpload.uploadToBucket, updateProfilCtrl);
router.get('/dashboard/:id', getDashboardById)
router.get('/profile/sale/:id', getSaleByUserIdCtrl)

// public API
router.get('/news', getNewsCtrl)

module.exports = router;