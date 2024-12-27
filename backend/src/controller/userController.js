const { generateAccessToken } = require('../middleware/authToken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config()

const User = require('../model/userModel')
const Sale = require('../model/saleModel')
const Chat = require('../model/chatModel');
const { newsModel } = require('../model/newsModel');

const registerCtrl = async (req, res) => {
    const { username, password, nama_lengkap, email, location } = req.body;
    const user_img = 'https://storage.googleapis.com/barkasgp-bucket/avatar.png'
    const user_id = crypto.randomUUID();

    let hashedPass = await bcrypt.hashSync(password, 10);
    const newUser = {
        user_id: user_id,
        username: username,
        password: hashedPass,
        nama_lengkap: nama_lengkap,
        email: email,
        location: location,
        user_img: user_img
    }
    try {
        const user = new User(newUser);
        await user.save();

        return res.status(200).json({
            error: false,
            message: 'Berhasil, Silahkan login!',
            user: newUser
        })

    } catch (e) {
        return res.status(500).json({
            error: true,
            message: e.message,
        });
    }
}

const loginCtrl = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user === null) {
        return res.status(400).json({
            error: true,
            message: 'User tidak ada, please register!'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(404).json({
            error: true,
            message: 'Password Salah!'
        })
    }

    const token = generateAccessToken(email);

    const detailUser = {
        ...user.toObject(),
        token: token
    }

    return res.status(200).json({
        error: false,
        message: 'Login Berhasil !',
        user: detailUser
    })
}

const updateProfilCtrl = async (req, res) => {
    const user_id = req.params.id
    const { username, nama_lengkap, email, location } = req.body;
    // const user_img = req.file.cloudStoragePublicUrl

    try {
        const user = await User.findOne({ user_id })

        const user_img = req.file
        ? req.file.cloudStoragePublicUrl
        : user.user_img;  

        const data = {
            user_id: user_id || user.user_id,
            username: username || user.username,
            nama_lengkap: nama_lengkap || user.nama_lengkap,
            email: email || user.email,
            location: location || user.location,
            user_img: user_img || user.user_img,
            password: user.password,
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            data,
            { new: true }
        )

        return res.status(200).json({
            error: false,
            message: 'Data anda berhasil diubah',
            user: updatedUser
        });

    } catch (error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const getUserbyidCtrl = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ user_id: id })
        
        return res.status(200).json({
            message: 'Berhasil mengambil data user!',
            user_info: user
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
}

const getDashboardById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOne({ user_id: id }).select('username');

        if (!user) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }

        const totalPost = await Sale.countDocuments({ user_id: id })
        const totalChatSession = await Chat.countDocuments({
            $or: [
                { participants: { $elemMatch: { your_user_id: id } } },
                { participants: { $elemMatch: { other_user_id: id } } }
            ]
        })

        const dashboard = {
            allPost: totalPost,
            allChatSession: totalChatSession
        }

        return res.status(200).json({
            error: false,
            message: 'Data dashboard ditampilkan !',
            username: user.username,
            dashboard: dashboard
        });

    } catch(error) {
        return res.status(500).json({
            message: e.message,
        });
    }
}

const getNewsCtrl = async (req, res) => {
    try {
        const news = await newsModel()
        res.status(200).json({
            success: true,
            data: news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { registerCtrl, loginCtrl, getUserbyidCtrl, updateProfilCtrl, getDashboardById, getNewsCtrl } 