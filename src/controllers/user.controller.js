const userService = require('../services/user.service');

const create = async (req, res) => {
  const token = await userService.create(req.body);

  res.status(201).json(token);
};

const findAll = async (_req, res) => {
  const users = await userService.findAll();

  res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const userById = await userService.findById(id);

  res.status(200).json(userById);
};

module.exports = { create, findAll, findById };