const Joi = require('joi');
const { User } = require('../database/models');
const errorUtil = require('../helpers/error.util');
const jwtUtil = require('../helpers/jwt.util');

const validateRequired = (login) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(login);

  if (error) throw errorUtil.generate(400, 'Some required fields are missing');
};

const validateEmail = (email) => {
  const schema = Joi.string().email().required();
  const { error } = schema.validate(email);

  if (error) throw errorUtil.generate(400, 'Invalid fields');
};

const validateLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) throw errorUtil.generate(400, 'Invalid fields');

  return user;
};

const authService = {
  login: async (email, password) => {
    validateRequired({ email, password });
    validateEmail(email);

    const user = await validateLogin(email, password);
    delete user.dataValues.password;

    const token = jwtUtil.generateToken(user.dataValues);

    return token;
  },
};

module.exports = authService;