const { User, Thought } = require('../models');

let deleteUser = '';

module.exports = {

    // Get all users

    getUser(req, res) {
        User.find()
            .then((users) => {
                return res.status(200).json(users);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // Get a single user

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('friends')
            .populate('thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a new user

    newUser(req, res) {
        User.create(req.body)
            .then((newUser) => {
                !newUser
                    ? res.status(404).json({ message: 'Failed to create new user!' })
                    : res.status(200).json('New User has been created Successfully!🥳')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a single user

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { username: req.body.username } }
        )
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'User with this ID is not found!' })
                    : res.status(200).json('Successfully Updated User!🥳')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete a user

    deleteUser(req, res) {
        User.findOne({ _id: req.params.id })
            .then((user) => {

                if (!user) {
                    return res.status(404).json({ message: 'No user found with this ID!' })
                }
                const thoughts = user.thoughts;
                return Promise.all([
                    User.findOneAndDelete({ _id: req.params.id }),
                    User.updateMany(
                        { _id: { $in: user.friends } },
                        { $pull: { friends: req.params.id, thoughts: { $in: thoughts } } }
                    ),
                    Thought.deleteMany({ _id: { $in: thoughts } }),
                ])
                    .then((user) => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    })
            });
    }
}

