const router = require('express').Router();
const {
    addNewReaction,
    deleteReaction
} = require('../../controllers/reactions');

router.route('/:thoughtId').post(addNewReaction);
router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;