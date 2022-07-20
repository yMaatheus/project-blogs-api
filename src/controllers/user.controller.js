const userService = require('../services/user.service');

const create = async (req, res) => {
  const result = await userService.create(req.body);

  res.status(201).json(result);
};

module.exports = { create };