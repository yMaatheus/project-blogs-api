const express = require('express');
require('express-async-errors');

const swaggerUi = require('swagger-ui-express');
const doc = require('../swagger.json');

const handleError = require('./middlewares/error.middleware');
const handleAutorization = require('./middlewares/authorization.middleware');

const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const userRouter = require('./routes/user.route');
const categoriesRouter = require('./routes/categories.route');
const postRouter = require('./routes/post.route');

const app = express();

app.use(express.json());

app.post('/login', authController.login);
app.post('/user', userController.create);

app.use('/user', handleAutorization, userRouter);
app.use('/categories', handleAutorization, categoriesRouter);
app.use('/post', handleAutorization, postRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));

app.use(handleError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
