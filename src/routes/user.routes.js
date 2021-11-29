'use strict'

const router = require('express').Router()

const {
    getUser,
    addUser,
    checkUser,
    updatePoint,
} = require('../controllers/user.controllers')

router.get('/', getUser)
router.post('/signin', checkUser)
router.post('/point', updatePoint)
router.post('/', addUser)

module.exports = router
