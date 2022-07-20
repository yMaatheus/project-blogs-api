const authService = require('../services/auth.service');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.status(200).json(token);
  },
};

module.exports = authController;