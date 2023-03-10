const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.delete('/me', userController.delete);

module.exports = router;