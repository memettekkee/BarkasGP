const mongoose = require('mongoose')

const MsgSchema = new mongoose.Schema({
    msg_id: { type: String, required: true },
    chat_id: { type: String, required: true },
    sender_id: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { 
        type: Date, 
        default: Date.now, // Otomatis diset waktu saat pesan dibuat
    },
})

const Message = mongoose.model('Message', MsgSchema)

module.exports = Message