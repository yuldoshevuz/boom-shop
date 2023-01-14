const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const generateJWTToken = require('../services/token')
const logged = require('../middlewares/logged')

// Get Login page
router.get('/login', logged, (req, res) => {
    req.isLogged('token', '/', req, res)
    res.render('login', {
        title: 'Login | Boom Shop',
        isLogin: true,
        loginErr: req.flash('loginErr')
    })
})
// Get Register page
router.get('/register', logged, (req, res) => {
    req.isLogged('token', '/', req, res)
    res.render('register', {
        title: 'Sign Up Now | Boom Shop',
        isRegister: true,
        registerErr: req.flash('registerErr')
    })
})
// Get Logout page
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

// Post Login page
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email && !password) {
            req.flash('loginErr', 'Sorry, you did not fill out all the fields')
            return res.redirect('/login')
        }
        const existUser = await User.findOne({ email })
        if (!existUser) {
            req.flash('loginErr', 'User not found or invalid email')
            return res.redirect('/login')
        }
        const equalPass = await bcrypt.compare(password, existUser.password)
        if (!equalPass) {
            req.flash('loginErr', 'The password you entered is incorrect')
            return res.redirect('/login')
        }
        const token = generateJWTToken(existUser._id, existUser.firstName, existUser.lastName, existUser.email)
        res.cookie('token', token, { httpOnly: true, secure: true })
        res.redirect('/')
        console.log('You have successfully logged in')
    } catch(error) {
        console.log(error)
    }
})
// Post Register page
router.post('/register', async (req, res) => {
    const { firstName, lastName, email } = req.body
    const password = await bcrypt.hash(req.body.password, 10)
    
    try {
        if (!firstName || !lastName || !email || !password) {
            req.flash('registerErr', 'Sorry, you did not fill out all the fields')
            res.redirect('/register')
            throw new Error()
        }
        const existMail = await User.findOne({ email })
        if (existMail) {
            req.flash('registerErr', 'Sorry, the email address you entered already exists')
            res.redirect('/register')
            throw new Error()
        }
        const user = await User.create({firstName, lastName, email, password})
        const token = generateJWTToken(user._id, user.firstName, user.lastName, user.email)
        res.cookie('token', token, { httpOnly: true, secure: true })
        res.redirect('/')

        console.log(user);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router