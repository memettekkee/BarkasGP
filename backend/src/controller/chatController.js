const crypto = require('crypto');

const Chat = require('../model/chatModel')
const Message = require('../model/msgModel')

const startChatCtrl = async (req, res) => {
    const { other_user_id } = req.params
    const { your_user_id, message } = req.body;
    // const receiver_id = other_user_id
    const chat_id = crypto.randomUUID();
    const msg_id = crypto.randomUUID();

    // console.log(receiver_id)
    console.log(your_user_id)

    try {
        const existingChat = await Chat.findOne({
            participants: { $all: [your_user_id, other_user_id] },
        });

        let chat;
        if (existingChat) {
            chat = existingChat
        } else {
            chat = new Chat({
                chat_id: chat_id,
                participants: [your_user_id, other_user_id],
            })
            await chat.save()
        }

        const msg = new Message({
            msg_id: msg_id,
            chat_id: chat_id,
            sender_id: your_user_id,
            message: message,
        });
        await msg.save()

        res.status(201).json({
            error: false,
            message: "Sesi chat berhasil dibuat !",
            chat: chat_id
        })

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

module.exports = { startChatCtrl }