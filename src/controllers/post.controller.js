const postService = require('../services/post.service');

const postController = {
  create: async (req, res) => {
    const post = await postService.create(req.body, req.user);

    res.status(201).json(post);
  },
};

module.exports = postController;