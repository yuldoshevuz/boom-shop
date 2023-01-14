const jwt = require('jsonwebtoken')

module.exports = (cookieName, req) => {
    const secretKey = process.env.JWT_SECRET || undefined
    const token = req.cookies[cookieName]
    const jwtHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    const isToken = token ? token.split('.')[0] === jwtHeader : false
    const decode = isToken ? jwt.verify(token, secretKey) : undefined
    return decode
}