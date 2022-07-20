const express = require('express');

const router = express.Router();

const postController = require('../controllers/post.controller');

router.post('/', postController.create);
router.get('/', postController.findAll);
router.get('/:id', postController.findById);
router.put('/:id', postController.updateById);

module.exports = router;