const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
    your_user_id: { type: String }, 
    your_name: { type: String },
    your_img: { type: String }, 
    other_user_id: { type: String }, 
    other_name: { type: String },
    other_img: { type: String } 
});

const ChatSchema = new mongoose.Schema({
    chat_id: { type: String, required: true },
    participants_id: [ String ],
    participants: [ParticipantSchema],
    createdAt: { 
        type: Date, 
        default: Date.now, 
    },
})

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat