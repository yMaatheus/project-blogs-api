const Joi = require('joi');
const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../database/models');
const errorUtil = require('../helpers/error.util');
const categoriesService = require('./categories.service');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateCreateRequired = (post) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  });

  const { error } = schema.validate(post);

  if (error) throw errorUtil.generate(400, 'Some required fields are missing');
};

const validateUpdateRequired = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) throw errorUtil.generate(400, 'Some required fields are missing');
};

const findById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) throw errorUtil.generate(404, 'Post does not exist');

  return post;
};

const validateUserAuthorization = async (id, { id: userId }) => {
  const post = await findById(id);

  if (userId !== post.userId) throw errorUtil.generate(401, 'Unauthorized user');

  return post;
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
    validateCreateRequired({ title, content, categoryIds });
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
  findAll: async () => {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return posts;
  },
  findById,
  update: async (id, { title, content }, user) => {
    validateUpdateRequired({ title, content });
    await validateUserAuthorization(id, user);

    await BlogPost.update({ title, content }, { where: { id } });

    const post = await postService.findById(id);

    return post;
  },
  delete: async (id, user) => {
    await validateUserAuthorization(id, user);

    await BlogPost.destroy({ where: { id } });
  },
};

module.exports = postService;