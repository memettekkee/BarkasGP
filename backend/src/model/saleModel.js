const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    fullname: { type: String, required: true }
})

const SaleSchema = new mongoose.Schema({
    sale_id: { type: String, required: true },
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
    location: { type: String, required: true },
    seller_info: [SellerSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: { type: Date }
})

const Sale = mongoose.model('Sale', SaleSchema)

module.exports = Sale