const crypto = require('crypto');

const Chat = require('../model/chatModel')

const startChatCtrl = async (req, res) => {
    const { your_user_id, message } = req.body;
    const { other_user_id } = req.params
    const chat_id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    try {
        const existingChat = await Chat.findOne({ chat_id });

        let chat;
        if (existingChat) {
            chat = existingChat
        } else {
            chat = new Chat({
                chat_id: chat_id,
                participants: [your_user_id, other_user_id],
                createdAt: createdAt,
            })
            await chat.save()
        }
    } catch (error) {

    }
}

module.exports = { startChatCtrl }