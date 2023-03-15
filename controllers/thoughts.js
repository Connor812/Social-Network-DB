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
    }
}