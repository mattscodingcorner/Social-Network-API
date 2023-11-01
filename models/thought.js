const { Schema, Types, model }  = require('mongoose'); 
const reactionSchema = require('../models/reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            unique: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [{
            type: reactionSchema,
            ref: 'reaction'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    },
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
(function(v) {
this._reactionCount = v;
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;