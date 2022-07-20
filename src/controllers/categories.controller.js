const categoriesService = require('../services/categories.service');

const categoriesController = {
  create: async (req, res) => {
    const { name } = req.body;

    const category = await categoriesService.create(name);

    res.status(201).json(category);
  },
  findAll: async (_req, res) => {
    const categories = await categoriesService.findAll();

    res.status(200).json(categories);
  },
};

module.exports = categoriesController;