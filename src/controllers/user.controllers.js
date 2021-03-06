'use strict'

const debug = require('debug')('dev')
const bcrypt = require('bcryptjs')
const User = require('../models/user.models')

// get all user data from db
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

// add new user to db
exports.addUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const checkUser = await User.findOne({ username })
        if (checkUser) {
            return res.status(400).json({ message: 'username already exist' })
        }
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
        res.status(400).json({ message: error.message })
    }
}

// check user and compare password
exports.checkUser = async (req, res) => {
    const { username, password } = req.body
    try {
        // get user from db
        const user = await User.findOne(
            { username },
            'username password point avatar'
        )
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }

        // compare password
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password, hashedPassword)
        if (!isMatch) {
            return res.status(400).json({ message: 'invalid password' })
        }

        // return user data
        res.json(user)
    } catch (error) {
        debug(error)
        res.status(400).json({ message: error.message })
    }
}

// update user point
exports.updatePoint = async (req, res) => {
    let { username, newPoint, time, turn } = req.body
    try {
        if (!username || !newPoint) {
            return res
                .status(400)
                .json({ message: 'username and newPoint are required!' })
        }
        // get data user
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        // update user time
        if (user.time === 0 || user.time > time) {
            user.time = parseInt(time)
        }
        // update user turn
        if (user.turn === 0 || user.turn > turn) {
            user.turn = parseInt(turn)
        }
        // Update user point
        user.point += parseInt(newPoint)
        // save updated data
        const data = await user.save()
        res.json(data)
    } catch (error) {
        debug(error)
        res.status(400).json({ message: error.message })
    }
}

// get and sort 10 user by highest point
exports.getUserByPoint = async (req, res) => {
    try {
        const user = await User.find().sort({ point: -1 }).limit(10)
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get and sort 10 user by lowest time
exports.getUserByTime = async (req, res) => {
    try {
        const user = await User.find({ time: { $lt: 100 } })
            .sort({ time: 1 })
            .limit(10)
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// get and sort 10 user by lowest turn
exports.getUserByTurn = async (req, res) => {
    try {
        const user = await User.find({ turn: { $lt: 60 } })
            .sort({ turn: 1 })
            .limit(10)
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
