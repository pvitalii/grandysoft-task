const { Router } = require('express');
const Controller = require('./controller');

const controllerInstance = new Controller();
const router = Router();

router.get('/users', controllerInstance.getAllUsers);
router.get('/users/:userId/friends', controllerInstance.getFriendsOfUserByOrder);
router.get('/max-following', controllerInstance.getMaxFollowingUsers);
router.get('/not-following', controllerInstance.getNotFollowingUsers);

module.exports = router;