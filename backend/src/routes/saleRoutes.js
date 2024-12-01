const express = require('express');
const multer = require('multer');
const { createSalePostCtrl, getAllSaleCtrl, getSaleByIdCtrl, updateSaleByIdCtrl, deleteSaleByIdCtrl } = require('../controller/saleController');
const router = express.Router();

router.post('', multer().none(), createSalePostCtrl)
router.get('', getAllSaleCtrl)
router.get('/:id', getSaleByIdCtrl)
router.put('/:id', multer().none(), updateSaleByIdCtrl)
router.delete('/:id', deleteSaleByIdCtrl)

module.exports = router