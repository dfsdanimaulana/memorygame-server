'use strict'

const router = require('express').Router()

const {
    getUser,
    addUser,
    checkUser,
} = require('../controllers/user.controllers')

router.get('/', getUser)
router.post('/signin', checkUser)
router.post('/', addUser)

module.exports = router
