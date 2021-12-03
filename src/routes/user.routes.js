'use strict'

const router = require('express').Router()

const {
    getUser,
    addUser,
    checkUser,
    updatePoint,
    getUserByPoint,
    getUserByTime,
    getUserByTurn,
} = require('../controllers/user.controllers')

router.get('/point', getUserByPoint)
router.get('/time', getUserByTime)
router.get('/turn', getUserByTurn)
router.get('/', getUser)
router.post('/login', checkUser)
router.post('/point', updatePoint)
router.post('/', addUser)

module.exports = router
