'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        timeSend: {
            type: String
        },
        content: {
            type: String,
            maxlength: [100,'message must be less than 100 character'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment