const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = model('User', UserSchema)

module.exports = User