const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async updateOneUser(req, res) {
        try {
            const result = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    username: req.body.username,
                    email: req.body.email,
                },
                { new: true }
            );
            if (!result) {
                res.status(400).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteOneUser(req, res) {
        try {
            const result = await User.findOneAndDelete({ _id: req.params.userId });
            if (!result) {
                res.status(400).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addToFriendList(req, res) {
        try {
            const result = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!result) {
                res.status(400).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFromFriendList(req, res) {
        try {
            const result = await User.findByIdAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!result) {
                res.status(400).json({ message: 'No friend found with that ID' });
                return;
            }
            res.status(200).json({ message: `Friend ${req.params.friendId} removed from friend list.` });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
