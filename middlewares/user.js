const User = require('../models/User')
const checkToken = require('./checkToken')

module.exports = async (req, res, next) => {
    try {
        const token = checkToken('token', req)
        if (!token) {
            next()
            return
        }
        const user = await User.findById(token.userId)
        req.userId = user._id
        next()
    } catch (error) {
        console.log('ERRROR MESSAGE:', error)
    }
}