const {Router} = require('express');
const {userController} = require('../controller');

const router = Router();

router.get('/users', userController.getUsers);

module.exports = router;