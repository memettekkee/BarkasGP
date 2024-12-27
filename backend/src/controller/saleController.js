const crypto = require('crypto');

const User = require('../model/userModel');
const Sale = require('../model/saleModel');


const createSalePostCtrl = async ( req, res ) => {
    const { user_id, title, desc, price, category ,location } = req.body
    const sale_img = req.file.cloudStoragePublicUrl;
    const sale_id = crypto.randomUUID();

    if (!user_id) {
        return res.status(404).json({
            error: true,
            message: "Belum Login!"
        });
    }

    const sellerInfo = await User.findOne({ user_id })

    const newSellerInfo = {
        user_id: sellerInfo.user_id,
        fullname: sellerInfo.nama_lengkap,
        seller_img: sellerInfo.user_img
    }

    const newSale = {
        sale_id: sale_id,
        user_id: user_id,
        title: title,
        desc: desc,
        price: price,
        category: category,
        location: location,
        sale_img: sale_img,
        seller_info: newSellerInfo
    }

    try {
        const sale = new Sale(newSale)
        await sale.save()

        return res.status(200).json({
            error: false,
            message: 'Produk penjualan berhasil di post !',
            sale: newSale
        })

    } catch(error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const getAllSaleCtrl = async (req, res) => {
    try {
        const sale = await Sale.find({})

        return res.status(200).json({
            error: false,
            message: 'Semua produk penjualan berhasil di tampilkan !',
            sale: sale
        })
    } catch (error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const getSaleByIdCtrl = async (req, res) => {
    const { id } = req.params
    try {
        const sale = await Sale.findOne({ sale_id: id })

        return res.status(200).json({
            error: false,
            message: 'Detail produk penjualan berhasil di tampilkan !',
            sale: sale
        })
    } catch(error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const updateSaleByIdCtrl = async (req, res) => {
    const { id } = req.params
    const { user_id, title, desc, price,category ,location } = req.body
    // const sale_img = req.file.cloudStoragePublicUrl;

    try {
        const saleInfo = await Sale.findOne({ sale_id: id });

        const sale_img = req.file ? req.file.cloudStoragePublicUrl : saleInfo.sale_img

        if (!saleInfo) {
            return res.status(404).json({
                error: true,
                message: "Postingan tidak ditemukan!"
            });
        }

        if (saleInfo.user_id !== user_id) {
            return res.status(403).json({
                error: true,
                message: "Anda bukan pemilik postingan ini!"
            });
        }

        const updatedSale = await Sale.findByIdAndUpdate(
            saleInfo._id,
            {
                title: title || saleInfo.title,
                desc: desc || saleInfo.desc,
                price: price || saleInfo.price,
                location: location || saleInfo.location,
                category: category || saleInfo.category,
                sale_img: sale_img || saleInfo.sale_img,
                updatedAt: Date.now()
            },
            { new: true } 
        );

        return res.status(200).json({
            error: false,
            message: 'Data produk berhasil diubah',
            sale: updatedSale
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
}

const deleteSaleByIdCtrl = async (req, res) => {
    const { id } = req.params
    try {
        const sale = await Sale.findOneAndDelete({ sale_id: id })

        if (!sale) {
            return res.status(404).json({
                error: true,
                message: "Data tidak ditemukan!"
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Data berhasil dihapus'
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
}

const getSaleByUserIdCtrl = async (req, res) => {
    const { id } = req.params

    try {
        const sale = await Sale.find({ user_id: id })

        if (sale.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'Tidak ada produk yang anda post !'
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Semua produk postingan berhasil ditemukan',
            sales: sale
        });
    } catch(error) {
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
}

module.exports = { createSalePostCtrl, getAllSaleCtrl, getSaleByIdCtrl, updateSaleByIdCtrl, deleteSaleByIdCtrl, getSaleByUserIdCtrl }