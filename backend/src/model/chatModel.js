const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    chat_id: { type: String, required: true },
    participants: [{ type: String, ref: 'User' }],
    createdAt: { 
        type: Date, 
        default: Date.now, // Otomatis diset waktu saat pesan dibuat
    },
})

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat