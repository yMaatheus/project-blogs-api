const Joi = require('joi');
const { User } = require('../database/models');
const errorUtil = require('../helpers/error.util');
const jwtService = require('./jwt.service');

const hasUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const validateRequired = (displayName, email, password, image) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  });

  const { error } = schema.validate({ displayName, email, password, image });

  if (error) throw errorUtil.generate(400, error.message);
};

const validateExists = async (email) => {
  const exists = await hasUser(email);

  if (exists) throw errorUtil.generate(409, 'User already registered');
};

const userService = {
  create: async ({ displayName, email, password, image }) => {
    validateRequired(displayName, email, password, image);
    await validateExists(email);

    const user = await User.create({ displayName, email, password, image });

    const token = jwtService.signIn(user);

    return token;
  },
  findAll: async () => {
    const users = await User.findAll({ attributes: { exclude: 'password' } });

    return users;
  },
  findById: async (id) => {
    const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });

    if (!user) throw errorUtil.generate(404, 'User does not exist');

    return user;
  },
  delete: async ({ id }) => {
    await User.destroy({ where: { id } });
  },
};

module.exports = userService;