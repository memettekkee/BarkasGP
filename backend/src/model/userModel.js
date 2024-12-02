const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    nama_lengkap: { type: String, required: true },
    email: { type: String, required: true },
    user_img: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)

module.exports = User