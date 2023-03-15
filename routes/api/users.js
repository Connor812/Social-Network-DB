const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    newUser,
    updateUser,
    deleteUser
} = require('../../controllers/users');

router.route('/').get(getUser).post(newUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)



module.exports = router;