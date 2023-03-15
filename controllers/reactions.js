const { Thought } = require('../models');


module.exports = {

    // Add new Comment
    addNewReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((updatedThought) => {
                !updatedThought
                    ? res.status(404).json({ message: 'No thought found with that Id!' })
                    : res.status(200).json('Reaction has been created!🥳')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });

    },

    deleteReaction(req, res) {
        
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then((deletedReaction) => {
            console.log(deletedReaction)
            !deletedReaction
                ? res.status(404).json({ message: 'No reaciton found with this Id' })
                : res.status(200).json('Successfully deleted the reaction!🥳')
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    }



}