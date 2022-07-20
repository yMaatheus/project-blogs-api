const express = require('express');

const router = express.Router();

const postController = require('../controllers/post.controller');

router.post('/', postController.create);
router.get('/', postController.findAll);

module.exports = router;