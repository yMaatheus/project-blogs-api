const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories.controller');

router.post('/', categoriesController.create);

module.exports = router;