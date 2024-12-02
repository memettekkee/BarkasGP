const crypto = require('crypto');

const Chat = require('../model/chatModel')
const Message = require('../model/msgModel');
const User = require('../model/userModel')
const { error } = require('console');

const startChatCtrl = async (req, res) => {
    const { other_user_id } = req.params
    const { your_user_id, message } = req.body;
    const chat_id = crypto.randomUUID();
    const msg_id = crypto.randomUUID();

    const yourFullname = await User.findOne({ user_id: your_user_id })
    const otherFullname = await User.findOne({ user_id: other_user_id })

    try {
        const existingChat = await Chat.findOne({
            $and: [
                { participants: { $elemMatch: { your_user_id: your_user_id } } },
                { participants: { $elemMatch: { other_user_id: other_user_id } } }
            ]
        });

        let chat;
        if (existingChat) {
            chat = existingChat
        } else {

            chat = new Chat({
                chat_id: chat_id,
                participants: [{
                    your_user_id: your_user_id,
                    your_name: yourFullname.nama_lengkap
                }, {
                    other_user_id: other_user_id,
                    other_name: otherFullname.nama_lengkap 
                }]
            })
            await chat.save()
        }

        const newMsg = {
            msg_id: msg_id,
            chat_id: chat.chat_id,
            sender_id: your_user_id,
            sender_name: yourFullname.nama_lengkap,
            message: message,
        }

        const msg = new Message(newMsg);
        await msg.save()

        return res.status(201).json({
            error: false,
            message: "Sesi chat berhasil dibuat !",
            session: chat,
            chat: newMsg
        })

    } catch (error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const sendMsgCtrl = async (req, res) => {
    const { chat_id } = req.params
    const { your_user_id, message } = req.body
    const msg_id = crypto.randomUUID()

    const user = await User.findOne({ user_id: your_user_id })

    const newMsg = {
        msg_id: msg_id,
        chat_id: chat_id,
        sender_id: your_user_id,
        sender_name: user.nama_lengkap,
        message: message
    }

    try {
        const chat = await Chat.findOne({
            chat_id: chat_id,
            $or: [
                { participants: { $elemMatch: { your_user_id: your_user_id } } },
                { participants: { $elemMatch: { other_user_id: your_user_id } } }
            ]
        })
        if (!chat) {
            res.status(404).json({
                error: true,
                message: 'Sesi chat gaada !'
            });
        }

        const msg = new Message(newMsg)
        await msg.save()

        return res.status(200).json({
            error: false,
            message: 'Pesan berhasil dikirim.',
            message: newMsg
        });

    } catch (error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const getAllChatSessionCtrl = async (req, res) => {
    const { your_user_id } = req.params
    try {
        const chats = await Chat.find({
            $or: [
                { participants: { $elemMatch: { your_user_id: your_user_id } } },
                { participants: { $elemMatch: { other_user_id: your_user_id } } }
            ]
        })
        .sort({ createdAt: -1 });

        if (chats.length === 0) {
            return res.status(404).json({
                error: true,
                message: "lu kaga ada ego"
            });
        }

         // Ambil detail pengguna untuk setiap participant
         const populatedChats = await Promise.all(
            chats.map(async (chat) => {
                // Ekstrak user_id dari participants
                const userIds = chat.participants.map((participant) => {
                    return participant.your_user_id || participant.other_user_id;
                });
                const participants = await User.find({
                    user_id: { $in: userIds }
                }).select('username user_id'); 

                return {
                    ...chat.toObject(),
                    participants,
                };
            })
        );

        return res.status(200).json({
            error: false,
            message: 'Semua sesi chat berhasil di tampilkan !',
            all_chats: populatedChats
        });

    } catch (error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const getAllChatMsgCtrl = async (req, res) => {
    const { chat_id, your_user_id } = req.params

    try {
        const chat = await Chat.findOne({
            chat_id: chat_id,
            $or: [
                { participants: { $elemMatch: { your_user_id: your_user_id } } },
                { participants: { $elemMatch: { other_user_id: your_user_id } } }
            ]
        });

        if (!chat) {
            res.status(404).json({
                error: true,
                message: 'Sesi chat gaada !'
            });
        }

        const msg = await Message.find({
            chat_id: chat_id
        })
        .sort({ createdAt: 1 });

        return res.status(200).json({
            error: false,
            message: 'Semua isi sesi chat berhasil di tampilkan !',
            participants: chat.participants,
            messages: msg
        });

    } catch (error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

module.exports = { startChatCtrl, sendMsgCtrl, getAllChatSessionCtrl, getAllChatMsgCtrl }