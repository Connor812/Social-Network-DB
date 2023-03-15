const router = require('express').Router();
const {
    addNewFriend,
    deleteFriend
} = require('../../controllers/friends');

router.route('/:id/friend/:friendId').post(addNewFriend).delete(deleteFriend);

module.exports = router;