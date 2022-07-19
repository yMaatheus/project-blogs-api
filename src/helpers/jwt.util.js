require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (data) => {
  const config = { expiresIn: '7d', algorithm: 'HS256' };

  console.log(data);

  const token = jwt.sign({ data }, JWT_SECRET, config);
  return { token };
};

module.exports = { generateToken };