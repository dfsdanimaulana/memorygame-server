'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'username required'],
            unique: [true, 'username is already exists'],
            minlength: [4, 'username must be more than 4 character'],
            maxlength: [15, 'username must be less than 15 character'],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
    },

    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User
