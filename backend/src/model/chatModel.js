const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
    your_user_id: { type: String }, // ID user Anda
    your_name: { type: String }, // Nama user Anda
    other_user_id: { type: String }, // ID user lain
    other_name: { type: String } // Nama user lain
});

const ChatSchema = new mongoose.Schema({
    chat_id: { type: String, required: true },
    participants: [ParticipantSchema],
    createdAt: { 
        type: Date, 
        default: Date.now, // Otomatis diset waktu saat pesan dibuat
    },
})

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat