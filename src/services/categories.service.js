const Joi = require('joi');
const { Category } = require('../database/models');
const errorUtil = require('../helpers/error.util');

const categoriesService = {
  create: async (name) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = schema.validate({ name });

    if (error) throw errorUtil.generate(400, error.message);

    const category = await Category.create({ name });

    return category;
  },
  findAll: async () => {
    const categories = await Category.findAll();

    return categories;
  },
};

module.exports = categoriesService;