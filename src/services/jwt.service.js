const jwtUtil = require('../helpers/jwt.util');

const jwtService = {
  signIn: (user) => {
    const data = user.dataValues ? user.toJSON() : user;
    delete data.password;

    const token = jwtUtil.generateToken(data);

    return token;
  },
};

module.exports = jwtService;