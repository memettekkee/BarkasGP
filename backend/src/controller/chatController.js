const crypto = require('crypto');

const Chat = require('../model/chatModel')
const Message = require('../model/msgModel');
const { error } = require('console');

const startChatCtrl = async (req, res) => {
    const { other_user_id } = req.params
    const { your_user_id, message } = req.body;
    const chat_id = crypto.randomUUID();
    const msg_id = crypto.randomUUID();

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

        const newMsg = {
            msg_id: msg_id,
            chat_id: chat.chat_id,
            sender_id: your_user_id,
            message: message,
        }

        const msg = new Message(newMsg);
        await msg.save()

        res.status(201).json({
            error: false,
            message: "Sesi chat berhasil dibuat !",
            chat: newMsg
        })

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const sendMsgCtrl = async (req, res) => {
    const { chat_id } = req.params
    const { your_user_id, message } = req.body
    const msg_id = crypto.randomUUID()

    const newMsg = {
        msg_id: msg_id,
        chat_id: chat_id,
        sender_id: your_user_id,
        message: message
    }

    try {
        const chat = await Chat.findOne({
            chat_id: chat_id,
            participants: { $in: [your_user_id] }
        })
        if (!chat) {
            res.status(404).json({
                error: true,
                message: 'Sesi chat gaada !'
            });
        }

        const msg = new Message(newMsg)
        await msg.save()

        res.status(200).json({
            error: false,
            message: 'Pesan berhasil dikirim.',
            message: newMsg
        });

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const getAllChatSessionCtrl = async (req, res) => {
    
}

module.exports = { startChatCtrl, sendMsgCtrl }