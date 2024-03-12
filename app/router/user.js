const { Router } = require('express');
const { userController } = require('../controller');

const router = Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);

router.post('/users', userController.addUser);
router.patch('/users/:id', userController.modifyUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
