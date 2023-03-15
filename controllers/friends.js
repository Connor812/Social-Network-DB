const { User } = require('../models');

module.exports = {

    addNewFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
            .then((friend) => {
                if (!friend) {
                    res.status(404).json({ message: 'No user found with friendId!' })
                } else {
                    User.findOneAndUpdate(
                        { _id: req.params.id },
                        { $addToSet: { friends: req.params.friendId } }
                    )
                        .then((updatedUser) => {
                            if (!updatedUser) {
                                res.status(404).json({ message: 'No user found with this Id!' })
                            } else {
                                User.findOneAndUpdate(
                                    { _id: req.params.friendId },
                                    { $addToSet: { friends: req.params.id } }
                                )
                                    .then(() => {
                                        res.status(200).json('Added New Friend Successfully!🥳')
                                    });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).json(err)
                        });
                }
            });
    },

    deleteFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
            .then((friend) => {
                if (!friend) {
                    res.status(404).json({ message: 'No user found with friendId!' })
                } else {
                    User.findOneAndUpdate(
                        { _id: req.params.id },
                        { $pull: { friends: req.params.friendId } },
                        { new: true }
                    )
                        .then((updatedUser) => {
                            if (!updatedUser) {
                                res.status(404).json({ message: 'No user found with this Id!' })
                            } else {
                                User.findOneAndUpdate(
                                    { _id: req.params.friendId },
                                    { $pull: { friends: req.params.id } },
                                    { new: true }
                                )
                                    .then(() => {
                                        res.status(200).json('Deleted friend Successfully!🥳')
                                    });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(500).json(err)
                        });
                }
            });
    }
}