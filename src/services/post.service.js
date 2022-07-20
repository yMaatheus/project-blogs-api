const Joi = require('joi');
const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../database/models');
const errorUtil = require('../helpers/error.util');
const categoriesService = require('./categories.service');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateRequired = (post) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  });

  const { error } = schema.validate(post);

  if (error) throw errorUtil.generate(400, 'Some required fields are missing');
};

const validateCategories = async (categoryIds) => {
  const promises = await Promise.all(
    categoryIds.map(categoriesService.findById),
  );

  const hasNull = categoryIds.length <= 0 || promises.some((result) => result == null);

  if (hasNull) throw errorUtil.generate(400, '"categoryIds" not found');
};

const postService = {
  create: async ({ title, content, categoryIds }, { id: userId }) => {
    validateRequired({ title, content, categoryIds });
    await validateCategories(categoryIds);
    const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create(
        { title, content, userId, published: Date.now(), updated: Date.now() }, { transaction: t },
      );

      const categories = categoryIds.map((categoryId) => ({ postId: post.id, categoryId }));
      await PostCategory.bulkCreate(categories, { transaction: t });

      return post;
    });

    return result;
  },
};

module.exports = postService;