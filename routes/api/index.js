const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');
const friendsRoutes = require('./friends');
const reactionsRoutes = require('./reactions');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/', friendsRoutes);
router.use('/reactions', reactionsRoutes);

module.exports = router;
