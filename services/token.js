const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET

const generateJWTToken = (userId, firstName, lastName, email) => {
    return jwt.sign({ userId, firstName, lastName, email }, secretKey, { expiresIn: '30d' })
}

module.exports = generateJWTToken