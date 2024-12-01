const { generateAccessToken } = require('../middleware/authToken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config()

const User = require('../model/userModel')

const registerCtrl = async (req, res) => {
    const { username, password, nama_lengkap, email } = req.body;
    const user_id = crypto.randomUUID();

    let hashedPass = await bcrypt.hashSync(password, 10);
    const newUser = {
        user_id: user_id,
        username: username,
        password: hashedPass,
        nama_lengkap:nama_lengkap,
        email: email,
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
    const { username, password } = req.body

    const user = await User.findOne({ username })

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

    const token = generateAccessToken(username);

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
    const { username, nama_lengkap, email } = req.body;

    try {
        const user = await User.findOne({ user_id })

        const data = {
            user_id: user_id || user.user_id,
            username: username || user.username,
            nama_lengkap: nama_lengkap || user.nama_lengkap,
            email: email || user.email,
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

module.exports = { registerCtrl, loginCtrl, getUserbyidCtrl, updateProfilCtrl } 