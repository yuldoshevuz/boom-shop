const checkToken = require('./checkToken')

module.exports = (req, res, next) => {
    req.isLogged = (cookieName, path, req, res) => {
        if (checkToken(cookieName, req)) {
            console.log(true);
            res.redirect(path)
        }
    }

    next()
}