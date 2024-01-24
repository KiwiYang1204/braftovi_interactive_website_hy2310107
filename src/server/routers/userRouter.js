const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/user', userController.addUser);

// router.post('/user/score', userController.updateUserScore);

router.get('/user', userController.getUsers);

module.exports = router;