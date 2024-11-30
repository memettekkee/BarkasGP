const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    chat_id: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
})

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat