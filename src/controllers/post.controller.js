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
  update: async (req, res) => {
    const { id } = req.params;
    const post = await postService.update(id, req.body, req.user);

    res.status(200).json(post);
  },
  delete: async (req, res) => {
    const { id } = req.params;

    await postService.delete(id, req.user);

    res.status(204).end();
  },
  search: async (req, res) => {
    const { q } = req.query;

    const result = await postService.search(q);

    res.status(200).json(result);
  },
};

module.exports = postController;