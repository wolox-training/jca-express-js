const { healthCheck } = require('./controllers/healthCheck');
const userController = require('./controllers/users');

const { validateSchema } = require('./middlewares/validationSchema');
const { createUserValidator } = require('./middlewares/schemas/users');
const { validateUserByEmail } = require('./middlewares/database/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSchema([createUserValidator]), validateUserByEmail], userController.createUser);
};
