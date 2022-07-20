const userService = require('../services/user.service');

const userController = {
  create: async (req, res) => {
    const token = await userService.create(req.body);

    res.status(201).json(token);
  },
  findAll: async (_req, res) => {
    const users = await userService.findAll();

    res.status(200).json(users);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const userById = await userService.findById(id);

    res.status(200).json(userById);
  },
};

module.exports = userController;