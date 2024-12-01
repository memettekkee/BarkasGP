const express = require('express');
const { verifyToken } = require('../middleware/authToken');
const multer = require('multer');
const { registerCtrl, loginCtrl, getUserbyidCtrl, updateProfilCtrl, getDashboardById } = require('../controller/userController');
const router = express.Router();

router.post('/register', multer().none(), registerCtrl);
router.post('/login', multer().none(), loginCtrl);
router.get('/profile/:id', getUserbyidCtrl);
router.put('/profile/:id', verifyToken, multer().none(), updateProfilCtrl);
router.get('/dashboard/:id', getDashboardById)

module.exports = router;