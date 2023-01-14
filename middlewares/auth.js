const checkToken = require('./checkToken')

module.exports = (req, res, next) => {
    if (!checkToken('token', req)) {
        res.redirect('/login')
    }
    next()
}