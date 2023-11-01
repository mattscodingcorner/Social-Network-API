const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('../models/reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        },
        reactions: [{
        ref: 'reaction'
        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    },
);