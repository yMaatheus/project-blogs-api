require('dotenv').config();
const jwt = require('jsonwebtoken');

const errorUtil = require('./error.util');

const { JWT_SECRET } = process.env;

const generateToken = (data) => {
  const config = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({ data }, JWT_SECRET, config);
  return { token };
};

const verifyToken = (token) => {
  try {
    const { data } = jwt.verify(token, JWT_SECRET);

    return data;
  } catch (_err) {
    throw errorUtil.generate(401, 'Expired or invalid token');
  }
};

module.exports = { generateToken, verifyToken };