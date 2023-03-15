const router = require('express').Router();
const {
    getThoughts,
    getSinlgeThought,
    createThought,
} = require('../../controllers/thoughts');

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSinlgeThought);


module.exports = router;