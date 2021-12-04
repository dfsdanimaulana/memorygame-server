'use strict'

const router = require('express').Router()

const { getComment } = require('../controllers/comment.controllers')

router.get('/', getComment)

module.exports = router