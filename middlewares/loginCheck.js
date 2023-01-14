const checkToken = require('./checkToken')

const loginCheck = (req, res, next) => {
    try {
        if (checkToken('token', req)) {
            res.locals.isAuth = true
        } else {
            res.locals.isAuth = false
        }
    } catch (error) {
        console.log(error)
    }
    next()
}

module.exports = loginCheck