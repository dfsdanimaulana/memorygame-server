'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isAlphanumeric } = require('validator')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'username required'],
            unique: [true, 'username is already exists'],
            minlength: [4, 'username must be more than 4 character'],
            maxlength: [15, 'username must be less than 15 character'],
            lowercase: true,
            validate: [
                isAlphanumeric,
                'username must not contains any special characters',
            ],
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        point: {
            type: Number,
            default: 0,
        },
        avatar: {
            type: String,
            default: 'twice.jpg',
        },
    },

    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User
