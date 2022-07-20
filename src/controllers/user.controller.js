const userService = require('../services/user.service');

const create = async (req, res) => {
  const token = await userService.create(req.body);

  res.status(201).json(token);
};

const findAll = async (_req, res) => {
  const users = await userService.findAll();

  res.status(200).json(users);
};

module.exports = { create, findAll };