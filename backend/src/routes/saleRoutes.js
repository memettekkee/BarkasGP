const express = require('express');
const multer = require('../middleware/uploadImages');
const bucketUpload = require('../utils/uploadToBucket')
const { createSalePostCtrl, getAllSaleCtrl, getSaleByIdCtrl, updateSaleByIdCtrl, deleteSaleByIdCtrl } = require('../controller/saleController');
const router = express.Router();

router.post('/', multer.single("sale_img"), bucketUpload.uploadToBucket ,createSalePostCtrl)
router.get('', getAllSaleCtrl)
router.get('/:id', getSaleByIdCtrl)
router.put('/:id', multer.single("sale_img"), bucketUpload.uploadToBucket ,updateSaleByIdCtrl)
router.delete('/:id', deleteSaleByIdCtrl)

module.exports = router