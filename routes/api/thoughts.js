const router = require('express').Router();
const {
    getThoughts,
    getSinlgeThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughts');

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSinlgeThought).put(updateThought).delete(deleteThought);


module.exports = router;