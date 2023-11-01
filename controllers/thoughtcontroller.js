const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createOneThought(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            const thought = await Thought.create(req.body);
            user.thoughts.push(thought._id);
            await user.save();

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateOneThought(req, res) {
        try {
            const result = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    thoughtText: req.body.thoughtText
                }
            );
            if (!result) {
                res.status(400).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteOneReaction(req, res) {
        try {
            const result = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId, 'reactions.reactionId': req.params.reactionId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!result) {
                res.status(400).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};