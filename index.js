const express = require('express')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const runServer = require('./partials/run')
const loginCheck = require('./middlewares/loginCheck')
const userMiddleware = require('./middlewares/user')
const path = require('path')

// dotenv config
require('dotenv').config()

// Get static path
const app = express()
app.use(express.static(path.join(__dirname, 'public')))

// Session
app.use(session({
    secret: 'KEY',
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

// Set up Handlebars
app.engine('hbs', engine({ extname: 'hbs', helpers: require('./util/index') }))
app.set('view engine', 'hbs')
app.set('views', './views')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(loginCheck)
app.use(userMiddleware)

// Middleware | import routes
app.use('/', require('./routes/home'))
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/products'))

// Run server
runServer(app)