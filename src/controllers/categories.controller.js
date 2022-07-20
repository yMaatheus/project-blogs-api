const categoriesService = require('../services/categories.service');

const categoriesController = {
  create: async (req, res) => {
    const { name } = req.body;

    const category = await categoriesService.create(name);

    res.status(201).json(category);
  },

};

module.exports = categoriesController;