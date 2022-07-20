const express = require('express');
require('express-async-errors');

const handleError = require('./middlewares/error.middleware');
const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.post('/login', authController.login);
app.post('/user', userController.create);

app.use(handleError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
