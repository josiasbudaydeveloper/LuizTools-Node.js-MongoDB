const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const validationMiddlware = require('../middlewares/validation-middleware');

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/', validationMiddlware, userController.insertUser);

router.put('/:id', validationMiddlware, userController.updateUserTotally);

router.patch('/:id', validationMiddlware, userController.updateUserPartially);

router.delete('/:id', userController.deleteUser) ;

module.exports = router;
