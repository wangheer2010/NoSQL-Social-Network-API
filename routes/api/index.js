const router = require('express').Router();
const userRoutes = require('./user-route');
const thoughtRoutes = require('./thought-route');

// add users and thoughts to the beginning of their respective routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;