const postService = require('../services/post.service');

const postController = {
  create: async (req, res) => {
    const post = await postService.create(req.body, req.user);

    res.status(201).json(post);
  },
  findAll: async (req, res) => {
    const posts = await postService.findAll();

    res.status(200).json(posts);
  },
};

module.exports = postController;