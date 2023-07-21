const router = require('express').Router();

const authController = require('../controllers/authController.js');
const postsController = require('../controllers/postsController.js');

router.use(authController);
router.use(postsController);

module.exports = router;