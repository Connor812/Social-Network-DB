const { Thought, User } = require('../models');



module.exports = {

    // Get thoughts

    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => {
                return res.status(200).json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // Get Thought by Id

    getSinlgeThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID!' })
                    : res.status(200).json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Create New Thought

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Though created, but no user found with that username.' })
                    : res.status(200).json('Thought has been created Successfully!🥳')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update Thought

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { thoughtText: req.body.thoughtText } }
            )
            .then((updatedThought) => {
                !updatedThought
                    ? res.status(404).json({ message: 'Thought with that Id not found!'} )
                    : res.status(200).json('Successfully Updated Thought!🥳')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete Thought

    deleteThought(req, res) {
        console.log(req.params.id)
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((deletedThought) => {
            console.log(deletedThought)
            !deletedThought
                ? res.status(404).json({ message: 'No thought with that Id found!' })
                : User.findOneAndUpdate(
                    { thoughts: req.params.id },
                    { $pull: { thoughts: req.params.id } },
                    { new: true }
                )
                .then((updatedUser) => {
                    !updatedUser
                        ?res.status(404).json({ message: 'Failed to removed deleted thought from the user!' })
                        :res.status(200).json('Successfully deleted thought!🥳')
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        });
    }
}