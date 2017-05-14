var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/projects', require('./project/projectRoutes'));
router.use('/notes', require('./note/noteRoutes'));

module.exports = router;
