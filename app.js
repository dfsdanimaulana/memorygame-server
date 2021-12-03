'use strict'

const express = require('express')
const createError = require('http-errors')
const cors = require('cors')
require('dotenv').config()

// Router
const userRouter = require('./src/routes/user.routes')

const app = express()

// cors security
app.use(
    cors({
        // origin: ['https://twice-memory.herokuapp.com'],
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
    })
)

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/user', userRouter)

app.use('/', (req, res) => {
    res.json({
        message: 'welcome to server',
    })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json({
        message: 'page not found'
    })
})

module.exports = app