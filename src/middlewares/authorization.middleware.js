const errorUtil = require('../helpers/error.util');
const jwtUtil = require('../helpers/jwt.util');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) throw errorUtil.generate(401, 'Token not found');

  const user = jwtUtil.verifyToken(token);
  req.user = user;

  next();
};