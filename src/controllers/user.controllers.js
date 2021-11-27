'use strict'

const User = require('../models/user.models')
const debug = require('debug')('dev')
const bcrypt = require('bcryptjs')

exports.getUser = async (req, res) => {
    try {
        const user = await User.find({})
        if (!user) {
            debug('user not found')
        }
        res.json(user)
    } catch (error) {
        debug(error)
        res.status(400).json({ message: error.message })
    }
}

exports.addUser = async (req, res) => {
    const { username, password } = req.body

    try {
        // validate password
        if (!password || password.length < 4) {
            return res
                .status(400)
                .json({ message: 'password must be more than 4 characthers' })
        }
        // hash password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        // create instance user
        const user = new User({
            username,
            password: hashedPassword,
        })

        // save user to db
        const saveUser = await user.save()
        if (!saveUser) {
            debug('failed to add user')
        }
        res.json(saveUser)
    } catch (error) {
        debug(error)
        res.status(400).send(error.message)
    }
}

exports.checkUser = async (req, res) => {
    const { username, password } = req.body
    try {
        // get user from db
        const user = await User.findOne({ username }, 'username password')
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }

        // compare password
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password, hashedPassword)
        if (!isMatch) {
            return res.status(400).json({ message: 'invalid password' })
        }

        res.json({ message: `you are logged in as ${username}` })
    } catch (error) {
        debug(error)
        res.status(400).send(error.message)
    }
}
