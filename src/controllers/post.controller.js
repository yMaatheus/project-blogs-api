const postService = require('../services/post.service');

const postController = {
  create: async (req, res) => {
    const post = await postService.create(req.body, req.user);

    res.status(201).json(post);
  },
  findAll: async (_req, res) => {
    const posts = await postService.findAll();

    res.status(200).json(posts);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const post = await postService.findById(id);

    res.status(200).json(post);
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    console.log(req.user);
    const post = await postService.update(id, req.body, req.user);

    res.status(200).json(post);
  },
};

module.exports = postController;