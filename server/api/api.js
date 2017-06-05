var router = require('express').Router();
var auth = require('../auth/auth');

// setup authentication before any route
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.use(checkUser);

// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/projects', require('./project/projectRoutes'));
router.use('/notes', require('./note/noteRoutes'));
router.use('/todos', require('./todo/todoRoutes'));

module.exports = router;
