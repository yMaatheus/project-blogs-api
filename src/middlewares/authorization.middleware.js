const errorUtil = require('../helpers/error.util');
const jwtUtil = require('../helpers/jwt.util');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw errorUtil.generate(401, 'Token not found');

  const user = jwtUtil.verifyToken(authorization);
  req.user = user;

  next();
};