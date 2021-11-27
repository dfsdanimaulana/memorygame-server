'use strict'

const router = require('express').Router()

const { getUser } = require('./controllers/user.controllers')

router.post('/', getUser)

module.exports = router