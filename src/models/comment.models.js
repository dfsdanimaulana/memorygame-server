'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    sender: {
        type: String,
        required:true,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        maxlength: 200,
        required:true
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment